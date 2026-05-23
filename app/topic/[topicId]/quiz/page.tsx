import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import QuizGame from "@/components/QuizGame";
import { getTopic } from "@/data/units";

type Props = { params: Promise<{ topicId: string }> };

export default async function QuizPage({ params }: Props) {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) notFound();

  return (
    <div>
      <BackButton />
      <div className="text-center mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800">{topic.emoji} {topic.name} — Quiz</h1>
        <p className="text-gray-400">Pick the right answer!</p>
      </div>
      <QuizGame words={topic.words} color={topic.color} topicId={topicId} />
    </div>
  );
}
