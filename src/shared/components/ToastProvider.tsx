"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, X, XCircle } from "lucide-react";

import { cn } from "@/shared/utils";

type ToastType = "success" | "error";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextValue {
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  const addToast = useCallback(
    (type: ToastType, title: string, description?: string) => {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`;

      setToasts((currentToasts) => [
        ...currentToasts,
        {
          id,
          type,
          title,
          description,
        },
      ]);

      window.setTimeout(() => {
        removeToast(id);
      }, 3500);
    },
    [removeToast]
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      success: (title, description) => addToast("success", title, description),
      error: (title, description) => addToast("error", title, description),
    }),
    [addToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed right-4 top-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={cn(
              "flex gap-3 rounded-card border p-4 shadow-lg",
              toast.type === "success" &&
                "border-success-600 bg-success-50 text-success-700",
              toast.type === "error" &&
                "border-danger-600 bg-danger-50 text-danger-700"
            )}
          >
            {toast.type === "success" ? (
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0"
                aria-hidden="true"
              />
            ) : (
              <XCircle
                className="mt-0.5 h-5 w-5 shrink-0"
                aria-hidden="true"
              />
            )}

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{toast.title}</p>

              {toast.description ? (
                <p className="mt-1 text-sm">{toast.description}</p>
              ) : null}
            </div>

            <button
              type="button"
              aria-label="Cerrar notificación"
              className="rounded-full p-1 transition hover:bg-black/5"
              onClick={() => removeToast(toast.id)}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast debe usarse dentro de ToastProvider.");
  }

  return context;
}