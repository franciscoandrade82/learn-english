import Link from "next/link";
import { units } from "@/data/units";

export default function Home() {
  return (
    <div>
      <div className="text-center py-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-1">Learn English</h1>
        <p className="text-lg text-gray-400">3rd Grade — Units 5 & 6</p>
      </div>
      <div className="grid gap-4">
        {units.map((unit) => (
          <Link key={unit.id} href={`/unit/${unit.id}`}
            className="block bg-white rounded-2xl shadow-md hover:shadow-lg active:scale-[0.97] transition-all duration-200 overflow-hidden">
            <div className="p-6 text-white" style={{ background: `linear-gradient(135deg, ${unit.color}, ${unit.colorDark})` }}>
              <div className="text-4xl mb-2">{unit.emoji}</div>
              <h2 className="text-2xl font-extrabold">{unit.name}</h2>
              <p className="text-white/80 text-lg">{unit.subtitle}</p>
              <p className="text-white/60 text-sm mt-1">{unit.topicIds.length} topics</p>
            </div>
          </Link>
        ))}
        <Link href="/grammar" className="block bg-white rounded-2xl shadow-md hover:shadow-lg active:scale-[0.97] transition-all duration-200 overflow-hidden">
          <div className="p-6 text-white" style={{ background: "linear-gradient(135deg, #A855F7, #7C3AED)" }}>
            <div className="text-4xl mb-2">📝</div>
            <h2 className="text-2xl font-extrabold">Grammar</h2>
            <p className="text-white/80 text-lg">Pronouns & Possessives</p>
          </div>
        </Link>
        {/* Songs */}
        <Link href="/songs" className="block bg-white rounded-2xl shadow-md hover:shadow-lg active:scale-[0.97] transition-all duration-200 overflow-hidden">
          <div className="p-6 text-white" style={{ background: "linear-gradient(135deg, #F59E0B, #EAB308)" }}>
            <div className="text-4xl mb-2">🎵</div>
            <h2 className="text-2xl font-extrabold">Songs</h2>
            <p className="text-white/80 text-lg">Sing and fill in the blanks</p>
          </div>
        </Link>

        {/* Reading */}
        <Link href="/read" className="block bg-white rounded-2xl shadow-md hover:shadow-lg active:scale-[0.97] transition-all duration-200 overflow-hidden">
          <div className="p-6 text-white" style={{ background: "linear-gradient(135deg, #06B6D4, #0891B2)" }}>
            <div className="text-4xl mb-2">📖</div>
            <h2 className="text-2xl font-extrabold">Reading</h2>
            <p className="text-white/80 text-lg">Read and answer questions</p>
          </div>
        </Link>

        {/* Writing */}
        <Link href="/write" className="block bg-white rounded-2xl shadow-md hover:shadow-lg active:scale-[0.97] transition-all duration-200 overflow-hidden">
          <div className="p-6 text-white" style={{ background: "linear-gradient(135deg, #A855F7, #EC4899)" }}>
            <div className="text-4xl mb-2">✍️</div>
            <h2 className="text-2xl font-extrabold">Writing Practice</h2>
            <p className="text-white/80 text-lg">Write and get AI feedback</p>
          </div>
        </Link>

        {/* Progress */}
        <Link href="/progress" className="block bg-white rounded-2xl shadow-md hover:shadow-lg active:scale-[0.97] transition-all duration-200 overflow-hidden">
          <div className="p-6 text-white" style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}>
            <div className="text-4xl mb-2">📊</div>
            <h2 className="text-2xl font-extrabold">Progress</h2>
            <p className="text-white/80 text-lg">Track your scores</p>
          </div>
        </Link>

        <Link href="/test" className="block bg-white rounded-2xl shadow-md hover:shadow-lg active:scale-[0.97] transition-all duration-200 overflow-hidden">
          <div className="p-6 text-white" style={{ background: "linear-gradient(135deg, #FF6B6B, #FF8E53)" }}>
            <div className="text-4xl mb-2">🎯</div>
            <h2 className="text-2xl font-extrabold">Test Me!</h2>
            <p className="text-white/80 text-lg">Mixed quiz — all topics</p>
            <p className="text-white/60 text-sm mt-1">Prepare for the real test</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
