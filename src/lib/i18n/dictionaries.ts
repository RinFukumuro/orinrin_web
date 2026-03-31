import type { Locale } from "./config";

const dictionaries = {
  ja: () => import("@/data/dictionaries/ja.json").then((m) => m.default),
  en: () => import("@/data/dictionaries/en.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
