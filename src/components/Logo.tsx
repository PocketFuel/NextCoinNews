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
        "font-sans font-extrabold leading-none bg-gradient-to-r from-yellow-500 to-green-500 bg-clip-text text-transparent",
        sizes[size]
      )}>
        NextCoinNews.com
      </h1>
    </div>
  );
}