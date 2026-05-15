/** 3. adım — sahte soru listesi ve önizleme verisi (API yok) */

export type QuestionDifficulty = 'easy' | 'medium' | 'hard'

export type MetodboxQuestionDifficultyCounts = {
  easy: number
  medium: number
  hard: number
}

export function getDifficultyCountsFromChosenIds(chosenIds: string[]): MetodboxQuestionDifficultyCounts {
  const c: MetodboxQuestionDifficultyCounts = { easy: 0, medium: 0, hard: 0 }
  for (const id of chosenIds) {
    const q = MOCK_METODOBOX_QUESTIONS.find((x) => x.id === id)
    if (!q) continue
    if (q.difficulty === 'easy') c.easy += 1
    else if (q.difficulty === 'medium') c.medium += 1
    else c.hard += 1
  }
  return c
}

export function isStep3ProceedEnabled(chosenIds: string[]) {
  return chosenIds.length > 0
}

export type MockMetodboxQuestion = {
  id: string
  listLabel: string
  /** Mock: indekse göre sabit “rastgele” zorluk */
  difficulty: QuestionDifficulty
  kazanimKodu: string
  kazanimMetni: string
  correctOption: 'A' | 'B' | 'C' | 'D'
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[]
}

const OPTION_SETS: MockMetodboxQuestion['options'][] = [
  [
    { key: 'A', text: '32' },
    { key: 'B', text: '36' },
    { key: 'C', text: '42' },
    { key: 'D', text: '48' },
  ],
  [
    { key: 'A', text: '2 ve 3' },
    { key: 'B', text: '4 ve 9' },
    { key: 'C', text: '6 ve 8' },
    { key: 'D', text: '5 ve 7' },
  ],
]

const DIFF_CYCLE: QuestionDifficulty[] = ['medium', 'easy', 'hard', 'medium', 'hard', 'easy']

export const METODOBOX_QUESTIONS_TOTAL = 20

function buildQuestion(i: number): MockMetodboxQuestion {
  const n = i + 1
  const baseOpts = OPTION_SETS[i % OPTION_SETS.length]
  const correct = (['A', 'B', 'C', 'D'] as const)[i % 4]
  const difficulty = DIFF_CYCLE[i % DIFF_CYCLE.length]
  return {
    id: `mq-${n}`,
    listLabel: `${n}.Soru`,
    difficulty,
    kazanimKodu: `MAT.12.CK.${String(n).padStart(2, '0')}`,
    kazanimMetni:
      'Çarpanları ve katları kullanarak problem kurar ve çözer; pozitif tam sayıların çarpanlarını ve katlarını belirler.',
    correctOption: correct,
    options: baseOpts,
  }
}

export const MOCK_METODOBOX_QUESTIONS: MockMetodboxQuestion[] = Array.from(
  { length: METODOBOX_QUESTIONS_TOTAL },
  (_, i) => buildQuestion(i),
)
