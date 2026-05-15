/** Konu seçimi — sahte seçenekler (tasarım önizlemesi) */
export type SubjectFieldKey = "level" | "lesson" | "unit" | "topic";

export type SubjectOption = { value: string; label: string };

export const SUBJECT_SELECTION_OPTIONS: Record<
  SubjectFieldKey,
  SubjectOption[]
> = {
  level: [
    { value: "10", label: "10. Sınıf" },
    { value: "11", label: "11. Sınıf" },
    { value: "12", label: "12. Sınıf" },
  ],
  lesson: [
    { value: "mat", label: "Matematik" },
    { value: "fen", label: "Fen Bilimleri" },
    { value: "tur", label: "Türkçe" },
  ],
  unit: [
    { value: "sayi", label: "Sayılar ve İşlemler" },
    { value: "cebir", label: "Cebir" },
    { value: "geo", label: "Geometri" },
  ],
  topic: [
    { value: "carpan", label: "Çarpanlar ve Katlar" },
    { value: "obeb", label: "OBEB-OKEK" },
    { value: "uslu", label: "Üslü İfadeler" },
  ],
};

export const EMPTY_SUBJECT_SELECTION: Record<SubjectFieldKey, string> = {
  level: "",
  lesson: "",
  unit: "",
  topic: "",
};

export function isSubjectSelectionComplete(v: Record<SubjectFieldKey, string>) {
  return v.level !== "" && v.lesson !== "" && v.unit !== "" && v.topic !== "";
}

/** Tamamlanan konu adımı — özet pill metinleri */
export function getSubjectSelectionSummaryLabels(
  v: Record<SubjectFieldKey, string>,
): string[] {
  const keys: SubjectFieldKey[] = ["level", "lesson", "unit", "topic"];
  return keys
    .map(
      (key) =>
        SUBJECT_SELECTION_OPTIONS[key].find((o) => o.value === v[key])?.label,
    )
    .filter((x): x is string => Boolean(x));
}
