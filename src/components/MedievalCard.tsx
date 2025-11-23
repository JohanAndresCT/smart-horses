import { Card } from "./ui/card";
import { cn } from "./ui/utils";

interface MedievalCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export function MedievalCard({ children, className, hoverable = false, onClick }: MedievalCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "relative bg-gradient-to-br from-[#1c1916] to-[#2d2823] border-2 border-[#c9a961]/30 p-6",
        "medieval-texture overflow-hidden card-3d",
        hoverable && "cursor-pointer transition-all duration-300 hover:border-[#c9a961]",
        className
      )}
    >
      {/* 3D Corner decorations */}
      <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#c9a961] opacity-70">
        <div className="absolute -top-[2px] -left-[2px] w-2 h-2 bg-[#e5d4a6] shadow-[0_0_8px_rgba(229,212,166,0.5)]" />
      </div>
      <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#c9a961] opacity-70">
        <div className="absolute -top-[2px] -right-[2px] w-2 h-2 bg-[#e5d4a6] shadow-[0_0_8px_rgba(229,212,166,0.5)]" />
      </div>
      <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#c9a961] opacity-70">
        <div className="absolute -bottom-[2px] -left-[2px] w-2 h-2 bg-[#e5d4a6] shadow-[0_0_8px_rgba(229,212,166,0.5)]" />
      </div>
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#c9a961] opacity-70">
        <div className="absolute -bottom-[2px] -right-[2px] w-2 h-2 bg-[#e5d4a6] shadow-[0_0_8px_rgba(229,212,166,0.5)]" />
      </div>
      
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#c9a961]/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </Card>
  );
}
