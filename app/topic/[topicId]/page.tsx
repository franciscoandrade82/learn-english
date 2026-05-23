import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import TopicCard from "@/components/TopicCard";
import { getTopic } from "@/data/units";

type Props = { params: Promise<{ topicId: string }> };

export default async function TopicPage({ params }: Props) {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) notFound();

  const activities = [
    { id: "flashcards", emoji: "🎴", name: "Flashcards", subtitle: "Flip and learn" },
    { id: "matching", emoji: "🃏", name: "Matching", subtitle: "Find the pairs" },
    { id: "quiz", emoji: "❓", name: "Quiz", subtitle: "Multiple choice" },
    { id: "fill", emoji: "✏️", name: "Fill in the Blanks", subtitle: "Complete sentences" },
    { id: "spelling", emoji: "🔤", name: "Spelling", subtitle: "Type the word" },
  ];

  return (
    <div>
      <BackButton />
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">{topic.emoji}</div>
        <h1 className="text-3xl font-extrabold text-gray-800">{topic.name}</h1>
        <p className="text-lg text-gray-400">{topic.words.length} words to learn</p>
      </div>
      <div className="grid gap-4">
        {activities.map((act) => (
          <TopicCard key={act.id} href={`/topic/${topicId}/${act.id}`} emoji={act.emoji}
            title={act.name} subtitle={act.subtitle} color={topic.color} />
        ))}
      </div>
    </div>
  );
}
