export type QuestionCreationModeId = "metodbox" | "tymm" | "ai";

export type QuestionCreationModeDef = {
  id: QuestionCreationModeId;
  icon: string;
};

export const QUESTION_CREATION_MODES: QuestionCreationModeDef[] = [
  { id: "metodbox", icon: "mdi:library-shelves" },
  { id: "tymm", icon: "mdi:file-document-outline" },
  { id: "ai", icon: "mdi:robot-outline" },
];
