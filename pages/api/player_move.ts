import type { NextApiRequest, NextApiResponse } from 'next';

type ApiResponse = {
  success: boolean;
  state?: any;
  error?: string;
};

const BOARD_SIZE = 8;

function getValidMoves(
  position: [number, number],
  board: number[][],
  destroyed: boolean[][]
): [number, number][] {
  const [row, col] = position;
  const moves: [number, number][] = [];
  const horseMoves = [
    [-2, -1], [-2, 1],
    [-1, -2], [-1, 2],
    [1, -2], [1, 2],
    [2, -1], [2, 1],
  ];

  for (const [dr, dc] of horseMoves) {
    const newRow = row + dr;
    const newCol = col + dc;

    if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
      if (!destroyed[newRow][newCol]) {
        moves.push([newRow, newCol]);
      }
    }
  }

  return moves;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { state, destination } = req.body;

    if (!state || !destination) {
      return res.status(400).json({
        success: false,
        error: 'Faltan parámetros requeridos',
      });
    }

    // Crear copia del estado
    const newBoard = state.board.map((row: number[]) => [...row]);
    const newDestroyed = state.destroyed.map((row: boolean[]) => [...row]);
    const newHorses = { ...state.horses };
    const newScore = { ...state.score };

    const [destRow, destCol] = destination;
    const currentPos = state.horses.white;

    // Validar movimiento
    const validMoves = getValidMoves(currentPos, newBoard, newDestroyed);
    const isValid = validMoves.some(([r, c]) => r === destRow && c === destCol);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        error: 'Movimiento inválido',
      });
    }

    // Aplicar movimiento
    const points = newBoard[destRow][destCol];
    newScore.player += points;
    newHorses.white = destination;
    newDestroyed[destRow][destCol] = true;

    // Verificar si el jugador puede seguir moviendo
    const playerCanMove = getValidMoves(newHorses.white, newBoard, newDestroyed).length > 0;

    // Recalcular si la IA está bloqueada justo después del movimiento del jugador
    const aiCanMove = getValidMoves(newHorses.black, newBoard, newDestroyed).length > 0;

    // Penalización: solo si el jugador está bloqueado y la IA sí puede mover
    if (!playerCanMove && aiCanMove) {
      newScore.player -= 4;
    }
    // Penalización acumulativa: si la IA está bloqueada y el jugador sí puede mover, se descuenta -4 a la IA en cada turno del jugador
    if (!aiCanMove && playerCanMove) {
      console.log('Penalización IA:', {
        aiCanMove,
        playerCanMove,
        scoreAI: newScore.ai,
        posBlack: newHorses.black,
        posWhite: newHorses.white
      });
      newScore.ai -= 4;
    }

    const gameOver = !playerCanMove && !aiCanMove;

    let winner = null;
    if (gameOver) {
      if (newScore.player > newScore.ai) {
        winner = 'player';
      } else if (newScore.ai > newScore.player) {
        winner = 'ai';
      } else {
        winner = 'tie';
      }
    }

    // Calcular movimientos válidos para la IA
    const aiValidMoves = getValidMoves(newHorses.black, newBoard, newDestroyed);

    const newState = {
      board: newBoard,
      horses: newHorses,
      destroyed: newDestroyed,
      score: newScore,
      turn: gameOver ? 'player' : 'ai',
      gameOver,
      winner,
      validMoves: aiValidMoves,
      lastMove: {
        player: 'player',
        from: currentPos,
        to: destination,
        points,
      },
    };

    res.status(200).json({
      success: true,
      state: newState,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
}