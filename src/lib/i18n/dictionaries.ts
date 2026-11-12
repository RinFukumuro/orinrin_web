import type { Locale } from "./config";
import jaDict from "@/data/dictionaries/ja.json";
import { locales } from "./config";
import { notFound } from "next/navigation";

export type Dictionary = typeof jaDict;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  ja: () => import("@/data/dictionaries/ja.json").then((m) => m.default),
  en: () => import("@/data/dictionaries/en.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  if (!locales.includes(locale)) notFound();
  return dictionaries[locale]();
};
