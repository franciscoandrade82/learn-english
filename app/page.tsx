import Link from "next/link";
import Image from "next/image";
import { units } from "@/data/units";

function Card({ href, emoji, title, subtitle, gradient }: {
  href: string; emoji: string; title: string; subtitle: string; gradient: string;
}) {
  return (
    <Link href={href} className="block bg-white rounded-2xl shadow-md hover:shadow-lg active:scale-[0.97] transition-all duration-200 overflow-hidden">
      <div className="p-4 text-white" style={{ background: gradient }}>
        <div className="text-2xl mb-1">{emoji}</div>
        <h3 className="text-base font-extrabold">{title}</h3>
        <p className="text-white/70 text-xs">{subtitle}</p>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div>
      {/* Header with mascot */}
      <div className="text-center pt-6 pb-4">
        <Image src="/images/mascot/waving.png" alt="" width={80} height={80} className="mx-auto mb-2 object-contain" />
        <h1 className="text-3xl font-extrabold text-gray-800 mb-0.5">Learn English</h1>
        <p className="text-sm text-gray-400">3rd Grade — Units 5 & 6</p>
      </div>

      {/* Study Section */}
      <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-4">Study</h2>
      <div className="grid gap-3 mb-4">
        {units.map((unit) => (
          <Link key={unit.id} href={`/unit/${unit.id}`}
            className="block bg-white rounded-2xl shadow-md hover:shadow-lg active:scale-[0.97] transition-all duration-200 overflow-hidden">
            <div className="p-5 text-white" style={{ background: `linear-gradient(135deg, ${unit.color}, ${unit.colorDark})` }}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{unit.emoji}</span>
                <div>
                  <h2 className="text-xl font-extrabold">{unit.name}</h2>
                  <p className="text-white/80 text-sm">{unit.subtitle}</p>
                  <p className="text-white/50 text-xs">{unit.topicIds.length} topics</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
        <Link href="/grammar" className="block bg-white rounded-2xl shadow-md hover:shadow-lg active:scale-[0.97] transition-all duration-200 overflow-hidden">
          <div className="p-5 text-white" style={{ background: "linear-gradient(135deg, #A855F7, #7C3AED)" }}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">📝</span>
              <div>
                <h2 className="text-xl font-extrabold">Grammar</h2>
                <p className="text-white/80 text-sm">Pronouns & Possessives</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Practice Section */}
      <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Practice</h2>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Card href="/songs" emoji="🎵" title="Song Lyrics" subtitle="Fill in the blanks" gradient="linear-gradient(135deg, #F59E0B, #EAB308)" />
        <Card href="/read" emoji="📖" title="Reading" subtitle="Answer questions" gradient="linear-gradient(135deg, #06B6D4, #0891B2)" />
        <Card href="/write" emoji="✍️" title="Writing" subtitle="AI feedback" gradient="linear-gradient(135deg, #A855F7, #EC4899)" />
        <Card href="/progress" emoji="📊" title="Progress" subtitle="Track scores" gradient="linear-gradient(135deg, #10B981, #059669)" />
      </div>

      {/* Test Section */}
      <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ready?</h2>
      <Link href="/test" className="block bg-white rounded-2xl shadow-md hover:shadow-lg active:scale-[0.97] transition-all duration-200 overflow-hidden">
        <div className="p-5 text-white" style={{ background: "linear-gradient(135deg, #FF6B6B, #FF8E53)" }}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎯</span>
            <div>
              <h2 className="text-xl font-extrabold">Test Me!</h2>
              <p className="text-white/80 text-sm">Mixed quiz — all topics</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
