import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import Flashcards from "@/components/Flashcards";
import { getTopic } from "@/data/units";

type Props = { params: Promise<{ topicId: string }> };

export default async function FlashcardsPage({ params }: Props) {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) notFound();

  return (
    <div>
      <BackButton />
      <div className="text-center mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800">{topic.emoji} {topic.name} — Flashcards</h1>
        <p className="text-gray-400">Flip and learn!</p>
      </div>
      <Flashcards words={topic.words} color={topic.color} />
    </div>
  );
}
