export type MetodboxTestCardDef = {
  id: string
  subject: string
  questionCount: number
  materialLabel: string
  testLabel: string
  topicTitle: string
}

export const METODOBOX_TEST_CARDS: MetodboxTestCardDef[] = [
  {
    id: 't1',
    subject: 'Matematik',
    questionCount: 15,
    materialLabel: 'Fasikül',
    testLabel: 'Test 1',
    topicTitle: 'Çarpanlar ve Katlar',
  },
  {
    id: 't2',
    subject: 'Matematik',
    questionCount: 12,
    materialLabel: 'Fasikül',
    testLabel: 'Test 2',
    topicTitle: 'OBEB — OKEK',
  },
  {
    id: 't3',
    subject: 'Matematik',
    questionCount: 18,
    materialLabel: 'Kitap',
    testLabel: 'Test 3',
    topicTitle: 'Üslü İfadeler',
  },
  {
    id: 't4',
    subject: 'Matematik',
    questionCount: 10,
    materialLabel: 'Fasikül',
    testLabel: 'Test 4',
    topicTitle: 'Rasyonel Sayılar',
  },
]
