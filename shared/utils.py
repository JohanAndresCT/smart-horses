"""
Funciones auxiliares compartidas
"""

from typing import List, Tuple
from .constants import BOARD_SIZE, KNIGHT_MOVES


def is_valid_position(row: int, col: int) -> bool:
    """
    Verifica si una posición está dentro del tablero
    
    Args:
        row: Fila
        col: Columna
    
    Returns:
        True si la posición es válida
    """
    return 0 <= row < BOARD_SIZE and 0 <= col < BOARD_SIZE


def get_possible_knight_moves(position: Tuple[int, int]) -> List[Tuple[int, int]]:
    """
    Obtiene todos los movimientos posibles de un caballo desde una posición
    (sin validar si las casillas están destruidas)
    
    Args:
        position: Posición actual (row, col)
    
    Returns:
        Lista de posiciones posibles
    """
    row, col = position
    moves = []
    
    for dr, dc in KNIGHT_MOVES:
        new_row, new_col = row + dr, col + dc
        if is_valid_position(new_row, new_col):
            moves.append((new_row, new_col))
    
    return moves


def initialize_board() -> List[List[int]]:
    """
    Inicializa el tablero con valores de puntos
    
    Returns:
        Tablero 10x10 con valores de puntos
    """
    board = []
    for i in range(BOARD_SIZE):
        row = []
        for j in range(BOARD_SIZE):
            # Patrón de valores basado en posición
            pattern_row = i // 2
            pattern_col = j // 2
            is_positive = (pattern_row + pattern_col) % 2 == 0
            value_index = (i % 2) * 5 + (j % 2)
            
            # Los valores van de -10 a 10
            base_value = value_index + 1
            value = base_value if is_positive else -base_value
            row.append(value)
        board.append(row)
    
    return board


def copy_board(board: List[List[int]]) -> List[List[int]]:
    """
    Crea una copia profunda del tablero
    
    Args:
        board: Tablero a copiar
    
    Returns:
        Copia del tablero
    """
    return [row[:] for row in board]


def copy_destroyed(destroyed: List[List[bool]]) -> List[List[bool]]:
    """
    Crea una copia profunda de la matriz de casillas destruidas
    
    Args:
        destroyed: Matriz a copiar
    
    Returns:
        Copia de la matriz
    """
    return [row[:] for row in destroyed]
