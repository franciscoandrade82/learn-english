import { notFound } from "next/navigation";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { getTopic } from "@/data/units";

type Props = { params: Promise<{ topicId: string }> };

export default async function TopicPage({ params }: Props) {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) notFound();

  const activities = [
    { id: "flashcards", emoji: "🎴", name: "Flashcards" },
    { id: "matching", emoji: "🃏", name: "Matching" },
    { id: "quiz", emoji: "❓", name: "Quiz" },
    { id: "fill", emoji: "✏️", name: "Fill Blanks" },
  ];

  return (
    <div>
      <BackButton />
      <div className="text-center mb-6">
        <div className="text-4xl mb-1">{topic.emoji}</div>
        <h1 className="text-2xl font-extrabold text-gray-800">{topic.name}</h1>
        <p className="text-sm text-gray-400">{topic.words.length} words</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {activities.map((act) => (
          <Link
            key={act.id}
            href={`/topic/${topicId}/${act.id}`}
            className="bg-white rounded-xl shadow-md active:scale-[0.95] transition-all overflow-hidden"
          >
            <div className="h-1.5 w-full" style={{ backgroundColor: topic.color }} />
            <div className="p-4 text-center">
              <div className="text-2xl mb-1">{act.emoji}</div>
              <h3 className="text-sm font-bold text-gray-800">{act.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
