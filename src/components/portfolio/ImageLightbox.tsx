"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/types/project";
import type { Locale } from "@/lib/i18n/config";

interface ImageLightboxProps {
  images: ProjectImage[];
  initialIndex: number;
  locale: Locale;
  onClose: () => void;
  dict: { close: string; prev: string; next: string };
}

export default function ImageLightbox({ images, initialIndex, locale, onClose, dict }: ImageLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  const image = images[index];
  if (!image) return null;
  const move = (step: number) => setIndex((current) => (current + step + images.length) % images.length);

  return (
    <dialog ref={dialogRef} aria-label={image.alt[locale]} onCancel={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-bg/95 backdrop-blur-md text-text border-0 p-4 open:flex open:items-center open:justify-center">
      <div className="w-full max-w-5xl">
        <div className="flex justify-end mb-4">
          <button type="button" onClick={onClose} className="rounded border border-primary/40 px-4 py-2 text-primary-light">{dict.close} ×</button>
        </div>
        <div className="relative h-[65dvh]">
          <Image src={image.src} alt={image.alt[locale]} fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-contain" />
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          {images.length > 1 && <button type="button" onClick={() => move(-1)} className="rounded px-4 py-2 text-primary-light">{dict.prev}</button>}
          <p className="text-sm text-text-muted text-center" aria-live="polite">{image.alt[locale]}{images.length > 1 && ` (${index + 1}/${images.length})`}</p>
          {images.length > 1 && <button type="button" onClick={() => move(1)} className="rounded px-4 py-2 text-primary-light">{dict.next}</button>}
        </div>
      </div>
    </dialog>
  );
}
