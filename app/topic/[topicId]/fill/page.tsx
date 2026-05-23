import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import FillBlanks from "@/components/FillBlanks";
import { getTopic } from "@/data/units";

type Props = { params: Promise<{ topicId: string }> };

export default async function FillPage({ params }: Props) {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) notFound();

  return (
    <div>
      <BackButton />
      <div className="text-center mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800">{topic.emoji} {topic.name} — Fill in the Blanks</h1>
        <p className="text-gray-400">Complete the sentence!</p>
      </div>
      <FillBlanks sentences={topic.sentences} color={topic.color} />
    </div>
  );
}
