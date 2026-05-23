type Props = {
  current: number;
  total: number;
  color?: string;
};

export default function ProgressBar({ current, total, color = "#45B7D1" }: Props) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-sm font-bold text-gray-500 mb-1">
        <span>Question {current} of {total}</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
