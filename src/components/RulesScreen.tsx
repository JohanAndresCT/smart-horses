import { BookOpen, Crown, Target, Shield, Swords } from "lucide-react";
import { MedievalCard } from "./MedievalCard";
import { MedievalButton } from "./MedievalButton";

interface RulesScreenProps {
  onBack: () => void;
}

export function RulesScreen({ onBack }: RulesScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-[#c9a961] shadow-[0_0_8px_rgba(201,169,97,0.4)]" />
            <BookOpen className="w-8 h-8 text-[#c9a961] drop-shadow-[0_0_10px_rgba(201,169,97,0.6)]" />
            <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-[#c9a961] shadow-[0_0_8px_rgba(201,169,97,0.4)]" />
          </div>
          <h2 
            className="text-6xl text-[#c9a961] font-medieval tracking-wider"
            style={{
              textShadow: `
                0 2px 0 #9a7b4a,
                0 4px 10px rgba(0,0,0,0.5),
                0 0 30px rgba(201,169,97,0.2)
              `
            }}
          >
            Reglas del Juego
          </h2>
          <p className="text-xl text-[#f5f1e8]/80">
            Domina las reglas de Smart Horses
          </p>
        </div>

        {/* Rules cards */}
        <div className="space-y-6">
          {/* Rule 1 */}
          <MedievalCard>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div 
                  className="p-4 bg-[#c9a961]/10 rounded border border-[#c9a961]/30 raised"
                  style={{
                    boxShadow: '0 4px 0 #6d5a3a, 0 6px 12px rgba(0,0,0,0.3)'
                  }}
                >
                  <Crown className="w-10 h-10 text-[#c9a961]" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl text-[#e5d4a6] font-medieval">
                  Objetivo del Juego
                </h3>
                <p className="text-[#f5f1e8]/80 leading-relaxed">
                  El objetivo es capturar el caballo del oponente mientras proteges el tuyo. 
                  Cada jugador controla un caballo en el tablero de ajedrez y debe moverse 
                  estratégicamente para eliminar al adversario.
                </p>
              </div>
            </div>
          </MedievalCard>

          {/* Rule 2 */}
          <MedievalCard>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div 
                  className="p-4 bg-[#c9a961]/10 rounded border border-[#c9a961]/30 raised"
                  style={{
                    boxShadow: '0 4px 0 #6d5a3a, 0 6px 12px rgba(0,0,0,0.3)'
                  }}
                >
                  <Target className="w-10 h-10 text-[#c9a961]" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl text-[#e5d4a6] font-medieval">
                  Movimiento del Caballo
                </h3>
                <p className="text-[#f5f1e8]/80 leading-relaxed">
                  Los caballos se mueven en forma de "L": dos casillas en una dirección 
                  (horizontal o vertical) y una casilla perpendicular. Este es el movimiento 
                  clásico del caballo en ajedrez. El caballo puede saltar sobre otras piezas.
                </p>
              </div>
            </div>
          </MedievalCard>

          {/* Rule 3 */}
          <MedievalCard>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div 
                  className="p-4 bg-[#c9a961]/10 rounded border border-[#c9a961]/30 raised"
                  style={{
                    boxShadow: '0 4px 0 #6d5a3a, 0 6px 12px rgba(0,0,0,0.3)'
                  }}
                >
                  <Shield className="w-10 h-10 text-[#c9a961]" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl text-[#e5d4a6] font-medieval">
                  Casillas Destruidas
                </h3>
                <p className="text-[#f5f1e8]/80 leading-relaxed">
                  Después de que un caballo se mueve desde una casilla, esa casilla queda 
                  destruida y no puede ser utilizada nuevamente en el juego. Esto reduce 
                  progresivamente el espacio disponible y aumenta la dificultad estratégica.
                </p>
              </div>
            </div>
          </MedievalCard>

          {/* Rule 4 */}
          <MedievalCard>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div 
                  className="p-4 bg-[#c9a961]/10 rounded border border-[#c9a961]/30 raised"
                  style={{
                    boxShadow: '0 4px 0 #6d5a3a, 0 6px 12px rgba(0,0,0,0.3)'
                  }}
                >
                  <Swords className="w-10 h-10 text-[#c9a961]" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl text-[#e5d4a6] font-medieval">
                  Condiciones de Victoria
                </h3>
                <p className="text-[#f5f1e8]/80 leading-relaxed">
                  Ganas el juego si: (1) Capturas el caballo del oponente moviéndote a su 
                  casilla, o (2) El oponente no tiene movimientos válidos disponibles. 
                  La estrategia es clave para acorralar al adversario.
                </p>
              </div>
            </div>
          </MedievalCard>
        </div>

        {/* Additional info */}
        <MedievalCard className="bg-[#c9a961]/5">
          <div className="text-center space-y-4">
            <div className="text-5xl">⚔</div>
            <p className="text-[#f5f1e8]/80 leading-relaxed">
              La inteligencia artificial utiliza el algoritmo <span className="text-[#c9a961]">Minimax</span> 
              {" "}para calcular los mejores movimientos posibles. Cuanto mayor sea la profundidad 
              seleccionada, más difícil será vencer a la IA.
            </p>
          </div>
        </MedievalCard>

        {/* Back button */}
        <div className="flex justify-center pt-4">
          <MedievalButton variant="secondary" onClick={onBack}>
            Volver al Inicio
          </MedievalButton>
        </div>
      </div>
    </div>
  );
}