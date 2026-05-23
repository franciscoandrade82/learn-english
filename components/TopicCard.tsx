import Link from "next/link";

type Props = {
  href: string;
  emoji: string;
  title: string;
  subtitle?: string;
  color: string;
};

export default function TopicCard({ href, emoji, title, subtitle, color }: Props) {
  return (
    <Link
      href={href}
      className="block bg-white rounded-2xl shadow-md hover:shadow-lg active:scale-[0.97] transition-all duration-200 overflow-hidden"
    >
      <div className="h-2 w-full" style={{ backgroundColor: color }} />
      <div className="p-5 text-center">
        <div className="text-4xl mb-2">{emoji}</div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </Link>
  );
}
