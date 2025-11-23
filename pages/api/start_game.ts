import type { NextApiRequest, NextApiResponse } from 'next';

type ApiResponse = {
  success: boolean;
  state?: any;
  error?: string;
};

// Constantes
const BOARD_SIZE = 8;
const POINT_VALUES = [-10, -5, -4, -3, -1, 1, 3, 4, 5, 10];

function generateInitialBoard() {
  // Crear tablero vacío (8x8)
  const board = Array(BOARD_SIZE).fill(0).map(() => Array(BOARD_SIZE).fill(0));
  const destroyed = Array(BOARD_SIZE).fill(false).map(() => Array(BOARD_SIZE).fill(false));

  // Obtener todas las posiciones disponibles
  const allPositions: [number, number][] = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      allPositions.push([i, j]);
    }
  }

  // Mezclar posiciones
  for (let i = allPositions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allPositions[i], allPositions[j]] = [allPositions[j], allPositions[i]];
  }

  // Asignar posiciones para los caballos
  const whitePos = allPositions[0];
  const blackPos = allPositions[1];

  // Asignar valores de puntos a 10 casillas aleatorias
  const pointPositions = allPositions.slice(2, 12);

  pointPositions.forEach((pos, i) => {
    const [row, col] = pos;
    board[row][col] = POINT_VALUES[i];
  });

  return {
    board,
    destroyed,
    horses: {
      white: whitePos,
      black: blackPos,
    },
  };
}

// Función para calcular movimientos válidos
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

  console.log('Calculando movimientos desde:', position);

  for (const [dr, dc] of horseMoves) {
    const newRow = row + dr;
    const newCol = col + dc;

    // Verificar límites
    if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
      // Verificar que no esté destruida
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
    const { board, destroyed, horses } = generateInitialBoard();

    // Calcular movimientos válidos para la IA (caballo negro, juega primero)
    const validMoves = getValidMoves(horses.black, board, destroyed);

    const initialState = {
      board,
      horses,
      destroyed,
      score: {
        ai: 0,
        player: 0,
      },
      turn: 'ai',
      gameOver: false,
      winner: null,
      validMoves,
    };

    res.status(200).json({
      success: true,
      state: initialState,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
}
