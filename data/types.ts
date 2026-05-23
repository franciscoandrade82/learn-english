export type VocabularyItem = {
  word: string;
  image: string;
};

export type SentenceExercise = {
  sentence: string;
  answer: string;
  image?: string;
};

export type GrammarExercise = {
  sentence: string;
  answer: string;
  options: string[];
  explanation: string;
};

export type Topic = {
  id: string;
  name: string;
  emoji: string;
  unitId: string;
  color: string;
  words: VocabularyItem[];
  sentences: SentenceExercise[];
};

export type Unit = {
  id: string;
  name: string;
  subtitle: string;
  emoji: string;
  color: string;
  colorDark: string;
  topicIds: string[];
};
