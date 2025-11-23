/**
 * Cliente API para comunicación con el backend Python
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface GameState {
  board: number[][];
  knights: {
    white: [number, number];
    black: [number, number];
  };
  destroyed: boolean[][];
  score: {
    ai: number;
    player: number;
  };
  turn: 'ai' | 'player';
  gameOver: boolean;
  winner: string | null;
  validMoves: [number, number][];
}

export interface ApiResponse<T> {
  success: boolean;
  state?: T;
  error?: string;
}

/**
 * Inicia un nuevo juego
 */
export async function startGame(): Promise<ApiResponse<GameState>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/start_game`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

/**
 * Procesa el movimiento del jugador
 */
export async function playerMove(
  state: GameState,
  destination: [number, number]
): Promise<ApiResponse<GameState>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/player_move`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        state,
        destination,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

/**
 * Procesa el movimiento de la IA
 */
export async function aiMove(
  state: GameState,
  depth: number
): Promise<ApiResponse<GameState>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai_move`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        state,
        depth,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}
