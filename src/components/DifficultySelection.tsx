import { Shield, Swords, Crown } from "lucide-react";
import { MedievalCard } from "./MedievalCard";
import { MedievalButton } from "./MedievalButton";

interface DifficultyLevel {
  id: string;
  name: string;
  depth: number;
  icon: React.ReactNode;
  description: string;
}

interface DifficultySelectionProps {
  onSelectDifficulty: (depth: number) => void;
  onBack: () => void;
}

export function DifficultySelection({ onSelectDifficulty, onBack }: DifficultySelectionProps) {
  const difficulties: DifficultyLevel[] = [
    {
      id: "beginner",
      name: "Principiante",
      depth: 2,
      icon: <Shield className="w-16 h-16 text-[#c9a961]" />,
      description: "Para aquellos que comienzan su viaje"
    },
    {
      id: "amateur",
      name: "Amateur",
      depth: 4,
      icon: <Swords className="w-16 h-16 text-[#c9a961]" />,
      description: "Un desafío equilibrado para estrategas"
    },
    {
      id: "expert",
      name: "Experto",
      depth: 6,
      icon: <Crown className="w-16 h-16 text-[#c9a961]" />,
      description: "Solo para maestros del ajedrez"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-6xl w-full space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-[#c9a961] shadow-[0_0_8px_rgba(201,169,97,0.4)]" />
            <Swords className="w-8 h-8 text-[#c9a961] drop-shadow-[0_0_10px_rgba(201,169,97,0.6)]" />
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
            Elige tu Desafío
          </h2>
          <p className="text-xl text-[#f5f1e8]/80">
            Selecciona el nivel de dificultad para la inteligencia artificial
          </p>
        </div>

        {/* Difficulty cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {difficulties.map((difficulty) => (
            <MedievalCard 
              key={difficulty.id}
              hoverable
              onClick={() => onSelectDifficulty(difficulty.depth)}
            >
              <div className="flex flex-col items-center text-center space-y-6 py-4">
                {/* Icon with 3D effect */}
                <div 
                  className="relative"
                  style={{
                    filter: 'drop-shadow(0 6px 0 #6d5a3a) drop-shadow(0 10px 16px rgba(0,0,0,0.4))'
                  }}
                >
                  {difficulty.icon}
                  <div className="absolute inset-0 blur-xl opacity-40">
                    {difficulty.icon}
                  </div>
                </div>

                {/* Name */}
                <h3 
                  className="text-3xl text-[#e5d4a6] font-medieval"
                  style={{
                    textShadow: '0 2px 0 #6d5a3a, 0 4px 8px rgba(0,0,0,0.5)'
                  }}
                >
                  {difficulty.name}
                </h3>

                {/* Depth indicator */}
                <div className="flex items-center gap-2">
                  <div className="h-[1px] w-12 bg-[#c9a961]/50" />
                  <span className="text-sm text-[#f5f1e8]/60 tracking-widest uppercase">
                    Profundidad {difficulty.depth}
                  </span>
                  <div className="h-[1px] w-12 bg-[#c9a961]/50" />
                </div>

                {/* Description */}
                <p className="text-[#f5f1e8]/80">
                  {difficulty.description}
                </p>

                {/* Decorative element */}
                <div className="flex gap-1 pt-2">
                  {[...Array(difficulty.depth)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-2 h-2 bg-[#c9a961] rotate-45 raised"
                      style={{
                        boxShadow: '0 2px 0 #6d5a3a, 0 3px 6px rgba(0,0,0,0.4)'
                      }}
                    />
                  ))}
                </div>
              </div>
            </MedievalCard>
          ))}
        </div>

        {/* Back button */}
        <div className="flex justify-center pt-8">
          <MedievalButton variant="secondary" onClick={onBack}>
            Volver al Inicio
          </MedievalButton>
        </div>
      </div>
    </div>
  );
}