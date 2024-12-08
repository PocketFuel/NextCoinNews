import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <h1 className={cn(
        "font-sans font-extrabold leading-none text-white",
        sizes[size]
      )}>
        Next Coin News
      </h1>
    </div>
  );
}