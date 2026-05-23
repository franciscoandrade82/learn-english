import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import SpellingGame from "@/components/SpellingGame";
import { getTopic } from "@/data/units";

type Props = { params: Promise<{ topicId: string }> };

export default async function SpellingPage({ params }: Props) {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) notFound();

  return (
    <div>
      <BackButton />
      <div className="text-center mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800">{topic.emoji} {topic.name} — Spelling</h1>
        <p className="text-gray-400">Type the word!</p>
      </div>
      <SpellingGame words={topic.words} color={topic.color} topicId={topicId} />
    </div>
  );
}
