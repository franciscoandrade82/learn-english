"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 text-lg font-semibold active:scale-95 transition-transform"
    >
      <span className="text-2xl">←</span>
      <span>Back</span>
    </button>
  );
}
