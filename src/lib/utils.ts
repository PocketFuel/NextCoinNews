import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return format(new Date(date), 'MMM d, yyyy');
}

export function generateChartData(points: number, trend: number): number[] {
  const data: number[] = [];
  let value = 100;
  
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.5) * 2 + trend / points;
    value *= (1 + change / 100);
    data.push(value);
  }
  
  return data;
}

export function formatCurrency(value: number): string {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(1)}T`;
  }
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(1)}B`;
  }
  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(1)}M`;
  }
  return `$${value.toFixed(2)}`;
}