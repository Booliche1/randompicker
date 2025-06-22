import "./globals.css";
import Image from "next/image";

export const metadata = {
  title: "Dofus Casino Roulette",
  description: "Tirage aléatoire de classes Dofus",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="relative min-h-screen text-white">

        {children}
      </body>
    </html>
  );
}
