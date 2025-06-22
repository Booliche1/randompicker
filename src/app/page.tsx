"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const SlotMachinePicker = dynamic(() => import("../components/SlotMachinePicker"), {
  ssr: false,
});


export default function Home() {
  const [activeTirage, setActiveTirage] = useState(1);

  const tirages = [
    { id: 1, label: "Solo", totalBoxes: 1 },
    { id: 2, label: "Duo", totalBoxes: 2 },
    { id: 3, label: "Trio", totalBoxes: 3 },
    { id: 4, label: "Team PVM", totalBoxes: 4 },
  ];

  return (
    <main className="min-h-screen p-6 bg-[url(/casino-bg.jpg)] bg-no-repeat bg-center bg-cover bg-fixed">
      <div className="flex justify-center gap-4 mb-8">
        {tirages.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTirage(t.id)}
            className={`px-4 py-2 rounded font-bold text-white ${
              activeTirage === t.id ? "bg-yellow-500" : "bg-gray-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-6xl mx-auto">
        {tirages.map((t) => (
          <div key={t.id}>
            {activeTirage === t.id && (
              <SlotMachinePicker
                tirageId={t.id}
                tirageLabel={t.label}
                totalBoxes={t.totalBoxes}
              />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
