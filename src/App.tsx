import { useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { DifficultySelection } from "./components/DifficultySelection";
import { GameBoard } from "./components/GameBoard";
import { RulesScreen } from "./components/RulesScreen";

type Screen = "home" | "difficulty" | "game" | "rules";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [selectedDifficulty, setSelectedDifficulty] = useState<number>(2);

  const handleStartGame = () => {
    setCurrentScreen("difficulty");
  };

  const handleShowRules = () => {
    setCurrentScreen("rules");
  };

  const handleSelectDifficulty = (depth: number) => {
    setSelectedDifficulty(depth);
    setCurrentScreen("game");
  };

  const handleBackToHome = () => {
    setCurrentScreen("home");
  };

  const handleResetGame = () => {
    setCurrentScreen("difficulty");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0e0d] via-[#1c1916] to-[#0f0e0d] relative">
      {/* Main content */}
      {currentScreen === "home" && (
        <HomeScreen 
          onStartGame={handleStartGame}
          onShowRules={handleShowRules}
        />
      )}

      {currentScreen === "difficulty" && (
        <DifficultySelection
          onSelectDifficulty={handleSelectDifficulty}
          onBack={handleBackToHome}
        />
      )}

      {currentScreen === "game" && (
        <GameBoard
          difficulty={selectedDifficulty}
          onReset={handleResetGame}
          onBack={handleBackToHome}
        />
      )}

      {currentScreen === "rules" && (
        <RulesScreen onBack={handleBackToHome} />
      )}

      {/* Background decorative patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-5 medieval-texture z-0" />
      
      {/* Subtle vignette effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(15, 14, 13, 0.7) 100%)"
        }}
      />
    </div>
  );
}
