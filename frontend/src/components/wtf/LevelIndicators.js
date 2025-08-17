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
      {/* Header section */}
      <div className="level-header">
        <h3>Levels</h3>
      </div>

      <div className="level-indicators-container flex gap-2 flex-wrap pb-2 px-4">
        {levels.map((level) => {
          const isActive = activeLevel === level.number;

          return (
            <button
              key={level.number}
              onClick={() => setActiveLevel(level.number)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 whitespace-nowrap border-0 focus:outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0 ${
                isActive
                  ? "bg-purple-500 text-white shadow-md hover:bg-purple-600 hover:shadow-lg hover:scale-105 focus:ring-purple-300"
                  : "bg-gray-400 text-gray-700 shadow-sm hover:bg-gray-500 hover:text-gray-800 hover:shadow-md hover:scale-105 focus:ring-gray-300"
              } active:scale-95`}
              style={{ height: "40px", minWidth: "100px" }}
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
