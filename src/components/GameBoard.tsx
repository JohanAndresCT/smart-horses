import { useState, useEffect } from "react";
import { Crown, RotateCcw, Circle, X } from "lucide-react";
import { MedievalCard } from "./MedievalCard";
import { MedievalButton } from "./MedievalButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface GameBoardProps {
  difficulty: number;
  onReset: () => void;
  onBack: () => void;
}

interface GameState {
  board: number[][];
  horses: {
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

export function GameBoard({ difficulty, onReset, onBack }: GameBoardProps) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showGameOverDialog, setShowGameOverDialog] = useState(false);

  // Log para debug
  useEffect(() => {
    if (gameState) {
      console.log('=== ESTADO DEL JUEGO ===');
      console.log('Caballo blanco (jugador):', gameState.horses.white);
      console.log('Caballo negro (IA):', gameState.horses.black);
      console.log('Turno:', gameState.turn);
      console.log('Movimientos válidos:', gameState.validMoves);
      console.log('Puntuación - Jugador:', gameState.score.player, 'IA:', gameState.score.ai);
    }
  }, [gameState]);

  // Detectar fin de juego
  useEffect(() => {
    if (gameState?.gameOver) {
      setShowGameOverDialog(true);
    }
  }, [gameState?.gameOver]);

  // Inicializar juego
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/start_game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.success) {
        setGameState(data.state);
        
        // Si es turno de la IA, hacer su movimiento
        if (data.state.turn === 'ai') {
          setTimeout(() => makeAIMove(data.state), 500);
        }
      } else {
        setError(data.error || 'Error al inicializar el juego');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const makeAIMove = async (currentState: GameState) => {
    try {
      const response = await fetch('/api/ai_move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          state: currentState,
          depth: difficulty,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('Después del movimiento de IA:');
        console.log('Caballo blanco (jugador) en:', data.state.horses.white);
        console.log('Caballo negro (IA) en:', data.state.horses.black);
        console.log('Movimientos válidos para jugador:', data.state.validMoves);
        setGameState(data.state);
      } else {
        setError(data.error || 'Error en el movimiento de la IA');
      }
    } catch (err) {
      setError('Error al procesar movimiento de la IA');
      console.error(err);
    }
  };

  const handleCellClick = async (row: number, col: number) => {
    if (!gameState || gameState.turn !== 'player' || gameState.gameOver) {
      return;
    }

    const clickedPos: [number, number] = [row, col];
    
    // Verificar si es un movimiento válido
    const isValidMove = gameState.validMoves.some(
      ([r, c]) => r === row && c === col
    );

    if (!isValidMove) {
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch('/api/player_move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          state: gameState,
          destination: clickedPos,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setGameState(data.state);
        
        // Si no terminó el juego y es turno de la IA, hacer su movimiento
        if (!data.state.gameOver && data.state.turn === 'ai') {
          setTimeout(() => makeAIMove(data.state), 500);
        }
      } else {
        setError(data.error || 'Movimiento inválido');
      }
    } catch (err) {
      setError('Error al procesar el movimiento');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getCellContent = (row: number, col: number) => {
    if (!gameState) return null;

    const { horses, board, destroyed, validMoves } = gameState;

    // Verificar si hay un caballo
    if (horses.white[0] === row && horses.white[1] === col) {
      return <span className="text-3xl text-black drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" style={{ WebkitTextStroke: '2px #fff', paintOrder: 'stroke fill', textShadow: '0 0 15px #000, 0 2px 8px rgba(0,0,0,0.8)' }}>♞</span>;
    }
    if (horses.black[0] === row && horses.black[1] === col) {
      return <span className="text-3xl text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)]">♞</span>;
    }

    // Verificar si está destruida
    if (destroyed[row][col]) {
      return <X className="w-6 h-6 text-[#8b1a1a] opacity-50" />;
    }

    // Verificar si es movimiento válido Y si tiene puntos
    const isValidMove = validMoves.some(([r, c]) => r === row && c === col);
    const points = board[row][col];
    
    // Si es movimiento válido y tiene puntos, mostrar ambos
    if (isValidMove && gameState.turn === 'player' && points !== 0) {
      const color = points > 0 ? 'text-green-400' : 'text-red-400';
      return (
        <div className="flex flex-col items-center justify-center gap-1">
          <Circle className="w-4 h-4 text-[#c9a961] opacity-60" />
          <span className={`text-xs font-bold ${color}`}>
            {points > 0 ? `+${points}` : points}
          </span>
        </div>
      );
    }

    // Si solo es movimiento válido
    if (isValidMove && gameState.turn === 'player') {
      return <Circle className="w-4 h-4 text-[#c9a961] opacity-60" />;
    }

    // Si solo tiene puntos
    if (points !== 0) {
      const color = points > 0 ? 'text-green-400' : 'text-red-400';
      return (
        <span className={`text-sm font-bold ${color}`}>
          {points > 0 ? `+${points}` : points}
        </span>
      );
    }

    return null;
  };

  const getCellClasses = (row: number, col: number) => {
    if (!gameState) return '';

    const isLight = (row + col) % 2 === 0;
    const baseClasses = "aspect-square flex items-center justify-center transition-all duration-200 relative";
    
    const { destroyed, validMoves, turn } = gameState;

    if (destroyed[row][col]) {
      return `${baseClasses} bg-[#1c1916]/40 border border-[#8b1a1a]/30 embossed cursor-not-allowed`;
    }

    const isValidMove = validMoves.some(([r, c]) => r === row && c === col);
    
    if (isValidMove && turn === 'player' && !gameState.gameOver) {
      return `${baseClasses} ${isLight ? "bg-[#3a342e]" : "bg-[#2d2823]"} hover:bg-[#c9a961]/20 border border-[#c9a961]/40 raised cursor-pointer`;
    }

    return `${baseClasses} ${isLight ? "bg-[#3a342e]" : "bg-[#2d2823]"} raised`;
  };

  const difficultyLabels: { [key: number]: string } = {
    2: "Principiante",
    4: "Amateur",
    6: "Experto"
  };

  if (loading && !gameState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-[#c9a961]">
          <div className="text-4xl mb-4">⚔</div>
          <p className="text-xl">Preparando el campo de batalla...</p>
        </div>
      </div>
    );
  }

  if (error && !gameState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <MedievalButton onClick={initializeGame}>
            Reintentar
          </MedievalButton>
        </div>
      </div>
    );
  }

  if (!gameState) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 lg:p-8">
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* Board section */}
          <div className="space-y-4">
            {/* Board header */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-4">
                <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#c9a961] shadow-[0_0_8px_rgba(201,169,97,0.4)]" />
                <Crown className="w-5 h-5 text-[#c9a961] drop-shadow-[0_0_10px_rgba(201,169,97,0.6)]" />
                <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#c9a961] shadow-[0_0_8px_rgba(201,169,97,0.4)]" />
              </div>
              <h2 
                className="text-3xl text-[#c9a961] font-medieval"
                style={{
                  textShadow: '0 2px 0 #9a7b4a, 0 4px 10px rgba(0,0,0,0.5)'
                }}
              >
                Campo de Batalla
              </h2>
            </div>

            {/* Chess board */}
            <MedievalCard className="p-3">
              <div 
                className="grid grid-cols-8 gap-0 border-2 border-[#c9a961] max-w-md mx-auto"
                style={{
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 8px 16px rgba(0,0,0,0.4)'
                }}
              >
                {gameState.board.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={getCellClasses(rowIndex, colIndex)}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                      {getCellContent(rowIndex, colIndex)}
                    </div>
                  ))
                )}
              </div>
            </MedievalCard>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 text-xs text-[#f5f1e8]/70">
              <div className="flex items-center gap-2">
                <Circle className="w-3 h-3 text-[#c9a961]" />
                <span>Movimiento válido</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="w-3 h-3 text-[#8b1a1a]" />
                <span>Casilla destruida</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-green-400 font-bold">+N</span>
                <span>Puntos positivos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-400 font-bold">-N</span>
                <span>Puntos negativos</span>
              </div>
            </div>



            {loading && (
              <div className="text-center text-[#c9a961] text-sm">
                Procesando movimiento...
              </div>
            )}
          </div>

          {/* Side panel */}
          <div className="space-y-4">
            {/* Scores */}
            <MedievalCard>
              <div className="space-y-4">
                <h3 className="text-xl text-[#c9a961] font-medieval text-center border-b border-[#c9a961]/30 pb-3">
                  Puntuación
                </h3>
                
                {/* AI Score */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">♞</span>
                      <span className="text-[#f5f1e8] text-sm">IA</span>
                    </div>
                    <span className="text-2xl text-[#c9a961]">{gameState.score.ai}</span>
                  </div>
                  <div className="h-[1px] bg-[#c9a961]/20" />
                </div>

                {/* Player Score */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">♘</span>
                      <span className="text-[#f5f1e8] text-sm">Jugador</span>
                    </div>
                    <span className="text-2xl text-[#c9a961]">{gameState.score.player}</span>
                  </div>
                </div>
              </div>
            </MedievalCard>

            {/* Game info */}
            <MedievalCard>
              <div className="space-y-3">
                <h3 className="text-xl text-[#c9a961] font-medieval text-center border-b border-[#c9a961]/30 pb-3">
                  Información
                </h3>
                
                <div className="space-y-2 text-sm text-[#f5f1e8]/80">
                  <div className="flex justify-between">
                    <span>Dificultad:</span>
                    <span className="text-[#c9a961]">{difficultyLabels[difficulty]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Profundidad:</span>
                    <span className="text-[#c9a961]">{difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Turno:</span>
                    <span className="text-[#c9a961]">
                      {gameState.turn === 'player' ? 'Jugador' : 'IA'}
                    </span>
                  </div>
                </div>
              </div>
            </MedievalCard>

            {/* Action buttons */}
            <div className="space-y-3">
              <MedievalButton 
                variant="secondary" 
                onClick={() => {
                  initializeGame();
                  onReset();
                }}
                className="w-full py-3"
              >
                <div className="flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>Reiniciar</span>
                </div>
              </MedievalButton>
              
              <MedievalButton 
                variant="secondary" 
                onClick={onBack}
                className="w-full py-3"
              >
                Volver al Menú
              </MedievalButton>
            </div>

            {/* Decorative element */}
            <div className="text-center opacity-20">
              <div className="text-4xl">⚔</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de fin de juego */}
      <AlertDialog open={showGameOverDialog} onOpenChange={setShowGameOverDialog}>
        <AlertDialogContent className="bg-[#1c1916] border-2 border-[#c9a961]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-center text-[#c9a961] font-medieval">
              {gameState?.winner === 'player' && '🏆 ¡Victoria!'}
              {gameState?.winner === 'ai' && '⚔️ Derrota'}
              {gameState?.winner === 'tie' && '🤝 Empate'}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-[#f5f1e8] space-y-3 pt-4">
              <div className="text-lg">
                {gameState?.winner === 'player' && '¡Felicidades! Has derrotado a la IA'}
                {gameState?.winner === 'ai' && 'Te has quedado sin movimientos válidos'}
                {gameState?.winner === 'tie' && 'Ambos jugadores se quedaron sin movimientos'}
              </div>
              <div className="flex justify-center gap-8 text-base pt-2">
                <div className="space-y-1">
                  <div className="text-[#c9a961] font-medieval">Jugador</div>
                  <div className="text-2xl font-bold">{gameState?.score.player}</div>
                </div>
                <div className="text-3xl text-[#c9a961]/30">VS</div>
                <div className="space-y-1">
                  <div className="text-[#c9a961] font-medieval">IA</div>
                  <div className="text-2xl font-bold">{gameState?.score.ai}</div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:justify-center">
            <AlertDialogAction
              onClick={() => {
                setShowGameOverDialog(false);
                initializeGame();
                onReset();
              }}
              className="bg-[#c9a961] hover:bg-[#b8975a] text-[#1c1916] font-medieval"
            >
              Jugar de nuevo
            </AlertDialogAction>
            <AlertDialogAction
              onClick={() => {
                setShowGameOverDialog(false);
                onBack();
              }}
              className="bg-[#3a342e] hover:bg-[#4a443e] text-[#f5f1e8] font-medieval"
            >
              Volver al menú
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}