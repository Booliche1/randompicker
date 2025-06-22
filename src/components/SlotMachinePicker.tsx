"use client";

import React, { useState } from "react";
import Image from "next/image";
import shuffle from "lodash.shuffle";
import CreatableSelect from "react-select/creatable";

interface SlotMachinePickerProps {
  tirageId: number;
  tirageLabel: string;
  totalBoxes: number;
}

const CLASS_OPTIONS = [
  "Cra 200", "Cra 199",
  "Ecaflip 200", "Ecaflip 199",
  "Eliotrope 200", "Eliotrope 199",
  "Eniripsa 200", "Eniripsa 199",
  "Enutrof 200", "Enutrof 199",
  "Feca 200", "Feca 199",
  "Forgelance 200", "Forgelance 199",
  "Huppermage 200", "Huppermage 199",
  "Iop 200", "Iop 199",
  "Osamodas 200", "Osamodas 199",
  "Ouginak 200", "Ouginak 199",
  "Pandawa 200", "Pandawa 199",
  "Roublard 200", "Roublard 199",
  "Sacrieur 200", "Sacrieur 199",
  "Sadida 200", "Sadida 199",
  "Sram 200", "Sram 199",
  "Steamer 200", "Steamer 199",
  "Xelor 200", "Xelor 199",
  "Zobal 200", "Zobal 199",
];

const classOptionsReactSelect = CLASS_OPTIONS.map((c) => ({
  label: c,
  value: c,
}));

const SlotMachinePicker = ({ tirageId, tirageLabel, totalBoxes }: SlotMachinePickerProps) => {
  const [inputs, setInputs] = useState<string[]>(Array(totalBoxes).fill(""));
  const [selects, setSelects] = useState<any[][]>(Array(totalBoxes).fill([]));
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [history, setHistory] = useState<string[][]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [animatedClasses, setAnimatedClasses] = useState<string[]>([]);

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleSelectChange = (index: number, value: any) => {
    const newSelects = [...selects];
    newSelects[index] = value;
    const newInputs = [...inputs];
    newInputs[index] = value.map((v: any) => v.value).join(", ");
    setInputs(newInputs);
    setSelects(newSelects);
  };

  const handleTirage = () => {
    const allEntries = inputs
      .flatMap((text) => text.split(",").map((item) => item.trim()))
      .filter((item) => CLASS_OPTIONS.includes(item));

    if (allEntries.length < totalBoxes) {
      alert("Pas assez de classes valides disponibles.");
      return;
    }

    const shuffled = shuffle(allEntries);
    const picked = shuffled.slice(0, totalBoxes);

    const totalSteps = 10;
    const interval = 80;
    setIsRolling(true);

    let step = 0;
    const animation = setInterval(() => {
      const fakeDraw = Array(totalBoxes)
        .fill(null)
        .map(() => allEntries[Math.floor(Math.random() * allEntries.length)]);
      setAnimatedClasses(fakeDraw);
      step++;
      if (step >= totalSteps) {
        clearInterval(animation);
        setSelectedClasses(picked);
        setAnimatedClasses(picked);
        setHistory((prev) => [[...picked], ...prev]);
        setIsRolling(false);
      }
    }, interval);
  };

  return (
    <div className="w-full p-6 rounded-lg bg-white/10 backdrop-blur-md shadow-md">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        🎲 {tirageLabel}
      </h2>

      {[...Array(totalBoxes)].map((_, index) => (
        <div key={index} className="mb-4">
          <label className="text-white font-semibold block mb-1">Classe #{index + 1}</label>
          <textarea
            value={inputs[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder="Sram 199, Forgelance 200, ..."
            className="w-full p-2 rounded text-black mb-2"
            rows={2}
          />
          <CreatableSelect
            isMulti
            options={classOptionsReactSelect}
            value={selects[index]}
            onChange={(value) => handleSelectChange(index, value)}
            className="text-black"
          />
        </div>
      ))}

      <button
        onClick={handleTirage}
        className="px-6 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-500"
      >
        Lancer le tirage
      </button>

      <div className="mt-6 flex gap-4 flex-wrap justify-center">
        {animatedClasses.map((className, index) => {
          const name = typeof className === "string" ? className.split(" ")[0] : className;
          return (
            <div
              key={index}
              className={`transition-all duration-300 p-4 text-center rounded bg-white/10 shadow text-white w-32`}
            >
              <Image
                src={`/classes/${name}.png`}
                alt={className}
                width={64}
                height={64}
                className="mx-auto mb-2"
              />
              <div>{className}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-black/80 p-4 rounded text-white">
        <h3 className="font-semibold mb-2">Historique des tirages :</h3>
        <ul className="list-disc pl-5">
          {history.map((entry, i) => (
            <li key={i}>{entry.join(" + ")}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SlotMachinePicker;
