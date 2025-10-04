import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

export function formatDate(date: Date | string): string {
  // Convert string to Date if needed
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    return 'تاريخ غير صحيح';
  }
  
  // Use completely stable formatting to avoid hydration issues
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1; // 1-12
  const day = dateObj.getDate();
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  
  // Use numeric format to avoid locale differences
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
