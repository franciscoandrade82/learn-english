import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import BoardGame from "@/components/BoardGame";
import { getUnit, getTopicsForUnit } from "@/data/units";

type Props = { params: Promise<{ unitId: string }> };

export default async function BoardGamePage({ params }: Props) {
  const { unitId } = await params;
  const unit = getUnit(unitId);
  if (!unit) notFound();
  const topics = getTopicsForUnit(unitId);
  const allWords = topics.flatMap((t) => t.words);

  return (
    <div>
      <BackButton />
      <div className="text-center mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800">🎲 {unit.name} — Board Game</h1>
        <p className="text-gray-400">Roll the dice and answer!</p>
      </div>
      <BoardGame words={allWords} color={unit.color} />
    </div>
  );
}
