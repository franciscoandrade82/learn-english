import BackButton from "@/components/BackButton";
import TopicCard from "@/components/TopicCard";

export default function GrammarPage() {
  return (
    <div>
      <BackButton />
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">📝</div>
        <h1 className="text-3xl font-extrabold text-gray-800">Grammar</h1>
        <p className="text-lg text-gray-400">Pronouns & Possessives</p>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
        <h3 className="font-extrabold text-gray-800 mb-3">Possessive Adjectives</h3>
        <p className="text-sm text-gray-400 mb-2">Come before a noun</p>
        <div className="flex flex-wrap gap-2">
          {["my", "your", "his", "her", "its", "our", "their"].map((w) => (
            <span key={w} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold text-sm">{w}</span>
          ))}
        </div>
        <p className="text-gray-500 mt-2 text-sm italic">This is <strong>my</strong> book.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
        <h3 className="font-extrabold text-gray-800 mb-3">Possessive Pronouns</h3>
        <p className="text-sm text-gray-400 mb-2">Stand alone — no noun after</p>
        <div className="flex flex-wrap gap-2">
          {["mine", "yours", "his", "hers", "ours", "theirs"].map((w) => (
            <span key={w} className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full font-bold text-sm">{w}</span>
          ))}
        </div>
        <p className="text-gray-500 mt-2 text-sm italic">The book is <strong>mine</strong>.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-5 mb-6">
        <h3 className="font-extrabold text-gray-800 mb-3">Subject & Object Pronouns</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="font-bold text-gray-400 mb-1">Subject</p>
            <div className="flex flex-wrap gap-1">
              {["I", "you", "he", "she", "it", "we", "they"].map((w) => (
                <span key={w} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-bold">{w}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold text-gray-400 mb-1">Object</p>
            <div className="flex flex-wrap gap-1">
              {["me", "you", "him", "her", "it", "us", "them"].map((w) => (
                <span key={w} className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full font-bold">{w}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <TopicCard href="/grammar/quiz" emoji="🧠" title="Grammar Quiz" subtitle="Test your knowledge!" color="#A855F7" />
    </div>
  );
}
