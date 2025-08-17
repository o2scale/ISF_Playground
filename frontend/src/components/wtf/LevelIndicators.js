import React, { useState } from "react";

const levels = [
  { number: 1, active: true },
  { number: 2, active: false },
  { number: 3, active: false },
  { number: 4, active: false },
];

const LevelIndicators = () => {
  const [activeLevel, setActiveLevel] = useState(1);

  return (
    <div className="w-full">
      <div className="level-indicators-container flex gap-2 flex-wrap pb-2 px-4">
        {levels.map((level) => {
          const isActive = activeLevel === level.number;

          return (
            <button
              key={level.number}
              onClick={() => setActiveLevel(level.number)}
              className={`px-12 py-4 rounded-full font-bold text-lg transition-all duration-200 whitespace-nowrap border-0 focus:outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0 ${
                isActive
                  ? "bg-purple-500 text-white shadow-lg hover:bg-purple-600 hover:shadow-xl hover:scale-105 focus:ring-purple-300"
                  : "bg-gray-400 text-gray-700 shadow-md hover:bg-gray-500 hover:text-gray-800 hover:shadow-lg hover:scale-105 focus:ring-gray-300"
              } active:scale-95`}
              style={{ height: "56px", minWidth: "160px" }}
            >
              Level {level.number}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LevelIndicators;
