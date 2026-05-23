import BackButton from "@/components/BackButton";
import TopicCard from "@/components/TopicCard";
import { readings } from "@/data/reading";

export default function ReadPage() {
  return (
    <div>
      <BackButton />
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">📖</div>
        <h1 className="text-3xl font-extrabold text-gray-800">Reading</h1>
        <p className="text-lg text-gray-400">Read and answer questions!</p>
      </div>
      <div className="grid gap-4">
        {readings.map((r) => (
          <TopicCard
            key={r.id}
            href={`/read/${r.id}`}
            emoji={r.emoji}
            title={r.title}
            subtitle={`${r.questions.length} questions`}
            color={r.color}
          />
        ))}
      </div>
    </div>
  );
}
