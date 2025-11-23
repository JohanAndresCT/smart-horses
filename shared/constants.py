"""
Constantes globales del juego Smart Horses
"""

# Valores de puntos del tablero
# Los valores positivos son casillas verdes, negativos son rojas
POINT_VALUES = [-10, -5, -4, -3, -1, 1, 3, 4, 5, 10]

# Dimensiones del tablero
BOARD_SIZE = 8

# Movimientos posibles del caballo (en forma de L)
KNIGHT_MOVES = [
    (-2, -1), (-2, 1),
    (-1, -2), (-1, 2),
    (1, -2), (1, 2),
    (2, -1), (2, 1)
]

# Turnos
PLAYER_TURN = 'player'
AI_TURN = 'ai'

# Límites de profundidad para minimax
MIN_DEPTH = 1
MAX_DEPTH = 8
