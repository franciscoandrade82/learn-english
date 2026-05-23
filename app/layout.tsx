import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learn English",
  description: "Interactive English learning app for 3rd grade",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <main className="max-w-4xl mx-auto px-4 py-6 pb-20">
          {children}
        </main>
      </body>
    </html>
  );
}
