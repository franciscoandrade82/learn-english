import BackButton from "@/components/BackButton";
import TopicCard from "@/components/TopicCard";
import { songs } from "@/data/songs";

export default function SongsPage() {
  return (
    <div>
      <BackButton />
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">🎵</div>
        <h1 className="text-3xl font-extrabold text-gray-800">Songs</h1>
        <p className="text-lg text-gray-400">Sing and learn!</p>
      </div>
      <div className="grid gap-4">
        {songs.map((song) => (
          <TopicCard
            key={song.id}
            href={`/songs/${song.id}`}
            emoji={song.emoji}
            title={song.title}
            subtitle={song.unitId === "unit5" ? "Unit 5" : "Unit 6"}
            color={song.color}
          />
        ))}
      </div>
    </div>
  );
}
