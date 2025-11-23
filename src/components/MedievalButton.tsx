import { Button } from "./ui/button";
import { cn } from "./ui/utils";

interface MedievalButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
}

export function MedievalButton({ 
  children, 
  variant = "primary", 
  onClick,
  className 
}: MedievalButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "relative px-8 py-6 border-2 font-medieval uppercase tracking-wider button-3d",
        variant === "primary" && [
          "bg-gradient-to-br from-[#c9a961] via-[#e5d4a6] to-[#c9a961]",
          "border-[#9a7b4a]",
          "text-[#1c1916]",
          "shadow-[0_6px_0_#6d5a3a,0_8px_20px_rgba(0,0,0,0.4)]"
        ],
        variant === "secondary" && [
          "bg-gradient-to-br from-[#2d2823] to-[#1c1916]",
          "border-[#c9a961]",
          "text-[#e5d4a6]",
          "shadow-[0_4px_0_#0f0e0d,0_6px_16px_rgba(0,0,0,0.4)]"
        ],
        className
      )}
    >
      <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
        {children}
      </span>
      {variant === "primary" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 rounded" />
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t" />
        </>
      )}
    </Button>
  );
}
