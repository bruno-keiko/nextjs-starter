import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CustomError extends Error {
  status?: number;
  response?: Response;
}

export function toQueryString(obj: Record<string, unknown>) {
  return new URLSearchParams(
    Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();
}

export const toFormData = (obj: Record<string, unknown>) => {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    if (value instanceof Blob) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  return formData;
};
