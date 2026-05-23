export type Song = {
  id: string;
  title: string;
  emoji: string;
  unitId: string;
  color: string;
  lines: SongLine[];
};

export type SongLine = {
  text: string; // use ___ for blanks
  answer?: string; // if line has a blank
  isChorus?: boolean;
};

export const songs: Song[] = [
  {
    id: "my-clothes",
    title: "My Clothes",
    emoji: "👕",
    unitId: "unit5",
    color: "#45B7D1",
    lines: [
      { text: "Hey, what are you wearing?" },
      { text: "A red ___ and brown trousers", answer: "jumper" },
      { text: "Hey, what are you wearing?" },
      { text: "A pink ___ and a yellow skirt", answer: "T-shirt" },
      { text: "" },
      { text: "I'm wearing my grey ___, yeah", answer: "tracksuit" },
      { text: "I'm wearing my white ___", answer: "pyjamas" },
      { text: "I'm wearing orange ___, yeah", answer: "shorts" },
      { text: "I'm wearing a purple ___", answer: "dress" },
      { text: "" },
      { text: "I'm wearing blue ___, my blue jeans", answer: "jeans" },
      { text: "I'm wearing black and white ___", answer: "socks" },
      { text: "I'm wearing my green ___", answer: "coat" },
      { text: "And I'm happy" },
      { text: "" },
      { text: "Because I'm wearing my clothes, I'm wearing", isChorus: true },
      { text: "I'm wearing my clothes so fine", isChorus: true },
      { text: "I'm wearing my clothes, I'm wearing", isChorus: true },
      {
        text: "Look at me now, I'm wearing my clothes so fine",
        isChorus: true,
      },
    ],
  },
  {
    id: "accessories-song",
    title: "Accessories Song",
    emoji: "🧢",
    unitId: "unit5",
    color: "#45B7D1",
    lines: [
      { text: "Oh accessories, accessories" },
      { text: "" },
      { text: "This is a ___", answer: "belt" },
      { text: "And these are ___", answer: "gloves" },
      { text: "This is a ___", answer: "watch" },
      { text: "And these are ___", answer: "glasses" },
      { text: "" },
      { text: "This is a ___, this is a hat", answer: "cap" },
      { text: "It's all right, all right, all right" },
      { text: "This is a ___, this is a scarf", answer: "beanie" },
      { text: "It's all right, all right, all right" },
    ],
  },
  {
    id: "shapes-everywhere",
    title: "Shapes Are Everywhere",
    emoji: "🔷",
    unitId: "unit5",
    color: "#45B7D1",
    lines: [
      { text: "Hey, hey, look over there" },
      { text: "It's a ___, it's a blue square", answer: "square" },
      { text: "Hey, hey, look very far" },
      {
        text: "It's a ___, it's a star, it's a yellow star",
        answer: "star",
      },
      { text: "Hey, hey, this is a purple ___", answer: "circle" },
      { text: "And that's a red ___, a big red heart", answer: "heart" },
      { text: "Hey, this is a green ___", answer: "triangle" },
      { text: "And that's a pink ___", answer: "rectangle" },
      { text: "" },
      { text: "Shapes are everywhere", isChorus: true },
    ],
  },
  {
    id: "go-to-school",
    title: "Go To School",
    emoji: "🚌",
    unitId: "unit6",
    color: "#44D492",
    lines: [
      { text: "How do you go to school?" },
      { text: "By ___ with my mother", answer: "car" },
      { text: "On the way I see a big red ___", answer: "bus" },
      { text: "A double-decker bus" },
      { text: "" },
      { text: "How do you go to school?" },
      { text: "By ___ with my friends", answer: "bike" },
      { text: "On the way I see a lorry full of candy" },
      { text: "And a black ___ to bike", answer: "motorbike" },
      { text: "" },
      { text: "I never go by ___, no", answer: "train" },
      { text: "I never go by ___, no", answer: "boat" },
      {
        text: "I never go by ___ (How do you go to school?)",
        answer: "helicopter",
      },
      { text: "I never go by ___, no", answer: "plane" },
      { text: "" },
      { text: "It's all right, it's all right", isChorus: true },
      {
        text: "You can always go on foot... Yeah",
        isChorus: true,
      },
      { text: "Say, how do you go, go to school?", isChorus: true },
    ],
  },
  {
    id: "happy-playground",
    title: "Happy Playground",
    emoji: "🤸",
    unitId: "unit6",
    color: "#44D492",
    lines: [
      { text: "Playground games" },
      { text: "We all have so much fun" },
      { text: "I like playground games" },
      { text: 'Time just seems to "run"' },
      { text: "" },
      { text: "She's ___, he's playing tag", answer: "skipping" },
      { text: "He's playing ___", answer: "marbles" },
      { text: "She's playing ___", answer: "hopscotch" },
      { text: "They're ___ all around", answer: "running" },
      { text: "They're playing hide and ___", answer: "seek" },
      { text: "It's a happy playground" },
      { text: "Seven days a week" },
    ],
  },
  {
    id: "games-sports-song",
    title: "Games and Sports Song",
    emoji: "⚽",
    unitId: "unit6",
    color: "#44D492",
    lines: [
      { text: "I really like playing ___", answer: "football" },
      { text: "And I love playing ___", answer: "basketball" },
      { text: "Oh, I like playing ___", answer: "handball" },
      { text: "And I love playing ___", answer: "volleyball" },
      { text: "" },
      { text: "I like playing ___", answer: "badminton" },
      { text: "I like everything, yes, I do" },
      { text: "" },
      { text: "Games and sports, I like them all", isChorus: true },
      { text: "Games and sports, now you know", isChorus: true },
      { text: "Games and sports, I love them so", isChorus: true },
      { text: "Games and sports, I love them all", isChorus: true },
    ],
  },
];

export function getSong(id: string): Song | undefined {
  return songs.find((s) => s.id === id);
}
