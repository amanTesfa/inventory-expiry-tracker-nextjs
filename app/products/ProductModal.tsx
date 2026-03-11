"use client";
import { useEffect } from "react";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ProductModal({
  open,
  onClose,
  children,
}: ProductModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-white bg-opacity-60 pointer-events-none" />
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-8 relative animate-fade-in">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
