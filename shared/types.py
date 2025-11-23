"""
Tipos de datos compartidos usando dataclasses
"""

from dataclasses import dataclass
from typing import List, Tuple, Literal

@dataclass
class Move:
    """Representa un movimiento en el tablero"""
    x: int
    y: int
    
    def to_tuple(self) -> Tuple[int, int]:
        """Convierte el movimiento a tupla"""
        return (self.x, self.y)
    
    @staticmethod
    def from_tuple(coords: Tuple[int, int]) -> 'Move':
        """Crea un movimiento desde una tupla"""
        return Move(x=coords[0], y=coords[1])


@dataclass
class Knights:
    """Posiciones de los caballos"""
    white: Tuple[int, int]
    black: Tuple[int, int]


@dataclass
class Score:
    """Puntuación de ambos jugadores"""
    player: int
    ai: int


Turn = Literal['player', 'ai']


@dataclass
class GameStateData:
    """Estado completo del juego"""
    board: List[List[int]]
    knights: Knights
    destroyed: List[List[bool]]
    score: Score
    turn: Turn
    
    def to_dict(self) -> dict:
        """Convierte el estado a diccionario para JSON"""
        return {
            'board': self.board,
            'knights': {
                'white': list(self.knights.white),
                'black': list(self.knights.black)
            },
            'destroyed': self.destroyed,
            'score': {
                'player': self.score.player,
                'ai': self.score.ai
            },
            'turn': self.turn
        }
    
    @staticmethod
    def from_dict(data: dict) -> 'GameStateData':
        """Crea un estado desde un diccionario"""
        return GameStateData(
            board=data['board'],
            knights=Knights(
                white=tuple(data['knights']['white']),
                black=tuple(data['knights']['black'])
            ),
            destroyed=data['destroyed'],
            score=Score(
                player=data['score']['player'],
                ai=data['score']['ai']
            ),
            turn=data['turn']
        )
