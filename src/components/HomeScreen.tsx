import { Crown, Sword, Shield } from "lucide-react";
import { MedievalButton } from "./MedievalButton";

interface HomeScreenProps {
  onStartGame: () => void;
  onShowRules: () => void;
}

export function HomeScreen({ onStartGame, onShowRules }: HomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background decorative elements with 3D effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 raised">
          <Crown className="w-32 h-32 text-[#c9a961]" />
        </div>
        <div className="absolute top-40 right-32 raised">
          <Sword className="w-28 h-28 text-[#c9a961] rotate-45" />
        </div>
        <div className="absolute bottom-32 left-40 raised">
          <Shield className="w-36 h-36 text-[#c9a961]" />
        </div>
        <div className="absolute bottom-20 right-20 raised">
          <Crown className="w-32 h-32 text-[#c9a961]" />
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl w-full text-center space-y-12 relative z-10">
        {/* Decorative top border */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[2px] w-32 bg-gradient-to-r from-transparent to-[#c9a961] shadow-[0_0_8px_rgba(201,169,97,0.4)]" />
          <Crown className="w-8 h-8 text-[#c9a961] drop-shadow-[0_0_10px_rgba(201,169,97,0.6)]" />
          <div className="h-[2px] w-32 bg-gradient-to-l from-transparent to-[#c9a961] shadow-[0_0_8px_rgba(201,169,97,0.4)]" />
        </div>

        {/* Title with 3D effect */}
        <div className="space-y-6">
          <h1
            className="text-8xl text-[#c9a961] font-medieval tracking-wider"
            style={{
              textShadow: `
                0 2px 0 #9a7b4a,
                0 4px 0 #6d5a3a,
                0 6px 20px rgba(0,0,0,0.5),
                0 0 40px rgba(201,169,97,0.3)
              `
            }}
          >
            SMART HORSES
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-24 bg-[#c9a961]/50" />
            <Sword className="w-6 h-6 text-[#c9a961]" />
            <div className="h-[1px] w-24 bg-[#c9a961]/50" />
          </div>
          <p className="text-2xl text-[#f5f1e8] opacity-90 tracking-wide">
            Una batalla estratégica entre caballos
          </p>
        </div>

        {/* Chess knight symbol with 3D effect */}
        <div className="flex justify-center my-12">
          <div
            className="relative text-9xl text-[#e5d4a6]"
            style={{
              filter: 'drop-shadow(0 8px 0 #6d5a3a) drop-shadow(0 12px 20px rgba(0,0,0,0.5))',
            }}
          >
            ♞
            <div className="absolute inset-0 text-9xl text-[#c9a961] blur-xl opacity-40">♞</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
          <MedievalButton variant="primary" onClick={onStartGame}>
            Iniciar Juego
          </MedievalButton>
          <MedievalButton variant="secondary" onClick={onShowRules}>
            Reglas del Juego
          </MedievalButton>
        </div>

        {/* Decorative bottom border */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <div className="h-[2px] w-32 bg-gradient-to-r from-transparent to-[#c9a961] shadow-[0_0_8px_rgba(201,169,97,0.4)]" />
          <Shield className="w-8 h-8 text-[#c9a961] drop-shadow-[0_0_10px_rgba(201,169,97,0.6)]" />
          <div className="h-[2px] w-32 bg-gradient-to-l from-transparent to-[#c9a961] shadow-[0_0_8px_rgba(201,169,97,0.4)]" />
        </div>
      </div>
    </div>
  );
}