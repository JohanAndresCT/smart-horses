import type { NextApiRequest, NextApiResponse } from 'next';
import { minimax } from './minmax';
import leaf from './type';
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { state, depth } = req.body;

    if (!state) {
      return res.status(400).json({
        success: false,
        error: 'Falta el parámetro state',
      });
    }

    // Crear copia del estado
    const newBoard = state.board.map((row: number[]) => [...row]);
    const newDestroyed = state.destroyed.map((row: boolean[]) => [...row]);
    const newHorses = { ...state.horses };
    const newScore = { ...state.score };

    const currentPosBlack = state.horses.black;
    const currentPosWhite = state.horses.white;

    // Obtener movimientos válidos para la IA
    const validMoves = getValidMoves(currentPosBlack, newBoard, newDestroyed);

    if (validMoves.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'La IA no tiene movimientos válidos',
      });
    }
    

    const leafNode = new leaf(
      currentPosWhite,
      currentPosBlack,
      currentPosWhite,
      currentPosBlack,
      0,
      newBoard,
      newDestroyed,
      depth,
      true,
      true
    );
     const [valCal, pos] = await minimax(leafNode, depth,);
    //  const [valCal, pos] = await minimax(leafNode, depth,-Infinity,+Infinity);
    const resultMinMax = pos;
    const destination = resultMinMax
    const [destRow, destCol] = destination;

    // Aplicar movimiento
    const points = newBoard[destRow][destCol];
    newScore.ai += points;
    newHorses.black = destination;
    newDestroyed[destRow][destCol] = true;

    // Verificar si la IA puede seguir moviendo
    const aiCanMove = getValidMoves(destination, newBoard, newDestroyed).length > 0;
    if (!aiCanMove) {
      newScore.ai -= 4;
    }

    // Verificar si el jugador puede mover
    const playerCanMove = getValidMoves(newHorses.white, newBoard, newDestroyed).length > 0;

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

    // Calcular movimientos válidos para el jugador
    const playerValidMoves = getValidMoves(newHorses.white, newBoard, newDestroyed);

    const newState = {
      board: newBoard,
      horses: newHorses,
      destroyed: newDestroyed,
      score: newScore,
      turn: gameOver ? 'ai' : 'player',
      gameOver,
      winner,
      validMoves: playerValidMoves,
      lastMove: {
        player: 'ai',
        from: currentPosBlack,
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
