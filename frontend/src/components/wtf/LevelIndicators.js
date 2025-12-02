import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const levels = [
  { number: 1, active: true },
  { number: 2, active: false },
  { number: 3, active: false },
  { number: 4, active: false },
];

const LevelIndicators = () => {
  const [activeLevel, setActiveLevel] = useState(1);
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      {/* Header with toggle button */}
      <div className="level-header">
        <h3>Levels</h3>
        <button
          onClick={toggleExpanded}
          className="level-toggle-button"
          title={isExpanded ? "Collapse levels" : "Expand levels"}
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 transition-transform duration-200" />
          ) : (
            <ChevronDown className="w-5 h-5 transition-transform duration-200" />
          )}
        </button>
      </div>

      {/* Collapsible level buttons container with smooth animation */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
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
    </div>
  );
};

export default LevelIndicators;
