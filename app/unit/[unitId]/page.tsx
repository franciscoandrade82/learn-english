import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import TopicCard from "@/components/TopicCard";
import { getUnit, getTopicsForUnit } from "@/data/units";

type Props = { params: Promise<{ unitId: string }> };

export default async function UnitPage({ params }: Props) {
  const { unitId } = await params;
  const unit = getUnit(unitId);
  if (!unit) notFound();
  const topics = getTopicsForUnit(unitId);

  return (
    <div>
      <BackButton />
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">{unit.emoji}</div>
        <h1 className="text-3xl font-extrabold text-gray-800">{unit.name}</h1>
        <p className="text-lg text-gray-400">{unit.subtitle}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {topics.map((topic) => (
          <TopicCard key={topic.id} href={`/topic/${topic.id}`} emoji={topic.emoji}
            title={topic.name} subtitle={`${topic.words.length} words`} color={topic.color} />
        ))}
      </div>
      <div className="mt-6">
        <TopicCard
          href={`/unit/${unitId}/board`}
          emoji="🎲"
          title="Board Game"
          subtitle="Roll the dice and answer!"
          color={unit.color}
        />
      </div>
    </div>
  );
}
