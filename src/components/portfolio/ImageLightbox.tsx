"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectImage } from "@/types/project";
import type { Locale } from "@/lib/i18n/config";

interface ImageLightboxProps {
  images: ProjectImage[];
  initialIndex: number;
  locale: Locale;
  onClose: () => void;
  dict: {
    close: string;
    prev: string;
    next: string;
  };
}

export default function ImageLightbox({
  images,
  initialIndex,
  locale,
  onClose,
  dict,
}: ImageLightboxProps) {
  const [index, setIndex] = useState(initialIndex);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  const image = images[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-text-muted hover:text-text transition-colors"
        >
          {dict.close} &times;
        </button>

        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={image.src}
            alt={image.alt[locale]}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full rounded-lg"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-bg/60 text-text hover:bg-bg/80 flex items-center justify-center transition-colors"
              aria-label={dict.prev}
            >
              &#8249;
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-bg/60 text-text hover:bg-bg/80 flex items-center justify-center transition-colors"
              aria-label={dict.next}
            >
              &#8250;
            </button>
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === index ? "bg-emerald-400" : "bg-text-muted/30"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <p className="text-center text-text-muted text-sm mt-2">
          {image.alt[locale]}
        </p>
      </div>
    </motion.div>
  );
}
