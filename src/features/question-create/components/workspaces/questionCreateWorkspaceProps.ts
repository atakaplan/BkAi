/** Soldaki soru üretim moduna göre ana panel içeriği — ortak sözleşme */
export type QuestionCreateWorkspaceProps = {
  /** «Devam et» için: mod tamamlanmaya hazır mı (ör. Metodbox’ta 1–3. adım bitti) */
  onPrimaryActionReadyChange?: (ready: boolean) => void;
  /** Açık accordion adımı (URL ile senkron) */
  openStep: number | null;
  onOpenStepChange: (step: number | null) => void;
};
