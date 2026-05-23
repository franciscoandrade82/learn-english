export type ReadingExercise = {
  id: string;
  title: string;
  emoji: string;
  color: string;
  text: string;
  questions: {
    question: string;
    options: string[];
    answer: string;
  }[];
};

export const readings: ReadingExercise[] = [
  {
    id: "lucy-clothes",
    title: "Lucy's Clothes",
    emoji: "👧",
    color: "#45B7D1",
    text: "Hi! My name is Lucy. Today it's sunny. I'm wearing a pink T-shirt, blue jeans and white trainers. I love my trainers! My favourite colour is pink. My brother Tom is wearing a green jumper and brown trousers. He's wearing black shoes. We are going to school.",
    questions: [
      {
        question: "What is Lucy wearing?",
        options: [
          "A blue dress",
          "A pink T-shirt and blue jeans",
          "A green jumper",
          "Orange shorts",
        ],
        answer: "A pink T-shirt and blue jeans",
      },
      {
        question: "What colour are Lucy's trainers?",
        options: ["Pink", "Blue", "White", "Black"],
        answer: "White",
      },
      {
        question: "What is Lucy's favourite colour?",
        options: ["Blue", "Green", "White", "Pink"],
        answer: "Pink",
      },
      {
        question: "What is Tom wearing?",
        options: [
          "A pink T-shirt",
          "A green jumper and brown trousers",
          "Blue jeans",
          "A red coat",
        ],
        answer: "A green jumper and brown trousers",
      },
      {
        question: "Where are they going?",
        options: ["To the park", "To the playground", "To school", "Home"],
        answer: "To school",
      },
    ],
  },
  {
    id: "mark-school",
    title: "Going to School",
    emoji: "🚌",
    color: "#44D492",
    text: "My name is Mark. I go to school by bus. My friend Sue goes to school by bike. She loves her red bike! Dan goes to school by car with his mother. Liz walks to school. She goes on foot because she lives near the school. How do you go to school?",
    questions: [
      {
        question: "How does Mark go to school?",
        options: ["By car", "By bike", "By bus", "On foot"],
        answer: "By bus",
      },
      {
        question: "How does Sue go to school?",
        options: ["By bus", "By bike", "By car", "On foot"],
        answer: "By bike",
      },
      {
        question: "What colour is Sue's bike?",
        options: ["Blue", "Green", "Red", "Yellow"],
        answer: "Red",
      },
      {
        question: "Who goes to school by car?",
        options: ["Mark", "Sue", "Dan", "Liz"],
        answer: "Dan",
      },
      {
        question: "Why does Liz walk to school?",
        options: [
          "She likes walking",
          "She lives near the school",
          "She has no bike",
          "Her mother walks too",
        ],
        answer: "She lives near the school",
      },
    ],
  },
  {
    id: "playground-fun",
    title: "Playground Fun",
    emoji: "🤸",
    color: "#44D492",
    text: "It's break time! The children are in the playground. Anna loves playing hopscotch. She's very good at it! Ben and Sam are playing football. They love football! Maria is skipping with her friends. Tom hates playing marbles but he likes running. Everyone is happy at the playground!",
    questions: [
      {
        question: "What does Anna love playing?",
        options: ["Football", "Marbles", "Hopscotch", "Tag"],
        answer: "Hopscotch",
      },
      {
        question: "What are Ben and Sam playing?",
        options: ["Basketball", "Football", "Volleyball", "Badminton"],
        answer: "Football",
      },
      {
        question: "What is Maria doing?",
        options: ["Running", "Playing hopscotch", "Skipping", "Playing marbles"],
        answer: "Skipping",
      },
      {
        question: "What does Tom hate?",
        options: [
          "Running",
          "Playing football",
          "Skipping",
          "Playing marbles",
        ],
        answer: "Playing marbles",
      },
      {
        question: "How are the children feeling?",
        options: ["Sad", "Tired", "Happy", "Bored"],
        answer: "Happy",
      },
    ],
  },
  {
    id: "seasons-year",
    title: "The Four Seasons",
    emoji: "🌸",
    color: "#44D492",
    text: "There are four seasons in a year. In spring, the flowers bloom and it is warm. In summer, it is very hot and we go to the beach. I love wearing shorts and sandals in summer! In autumn, the leaves fall from the trees. They are orange and red. In winter, it is very cold. I wear my coat, scarf and gloves. My favourite season is summer because I love the beach!",
    questions: [
      {
        question: "How many seasons are there?",
        options: ["Two", "Three", "Four", "Five"],
        answer: "Four",
      },
      {
        question: "What happens in spring?",
        options: [
          "It snows",
          "Leaves fall",
          "Flowers bloom",
          "It's very hot",
        ],
        answer: "Flowers bloom",
      },
      {
        question: "What do we wear in summer?",
        options: [
          "Coat and gloves",
          "Jumper and boots",
          "Shorts and sandals",
          "Scarf and beanie",
        ],
        answer: "Shorts and sandals",
      },
      {
        question: "What colour are the leaves in autumn?",
        options: [
          "Green and blue",
          "Orange and red",
          "Pink and purple",
          "Yellow and white",
        ],
        answer: "Orange and red",
      },
      {
        question: "What is the writer's favourite season?",
        options: ["Spring", "Summer", "Autumn", "Winter"],
        answer: "Summer",
      },
    ],
  },
];

export function getReading(id: string): ReadingExercise | undefined {
  return readings.find((r) => r.id === id);
}
