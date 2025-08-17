import React, { useState } from "react";

const categories = [
  {
    name: "All",
    color: "bg-blue-500 hover:bg-blue-600",
    selectedColor: "bg-blue-600",
  },
  {
    name: "Mann Ki Baat",
    color: "bg-purple-600 hover:bg-purple-700",
    selectedColor: "bg-purple-800",
    isOfficial: true,
    category: "mann-ki-baat",
  },
  {
    name: "Op Ed",
    color: "bg-indigo-600 hover:bg-indigo-700",
    selectedColor: "bg-indigo-800",
    isOfficial: true,
    category: "op-ed",
  },
  {
    name: "ISF Updates",
    color: "bg-teal-600 hover:bg-teal-700",
    selectedColor: "bg-teal-800",
    isOfficial: true,
    category: "isf-updates",
  },
  {
    name: "Medical",
    color: "bg-green-500 hover:bg-green-600",
    selectedColor: "bg-green-700",
  },
  {
    name: "Life Skills",
    color: "bg-green-500 hover:bg-green-600",
    selectedColor: "bg-green-700",
  },
  {
    name: "Spoken Eng",
    color: "bg-green-500 hover:bg-green-600",
    selectedColor: "bg-green-700",
  },
  {
    name: "Comp Apps",
    color: "bg-orange-500 hover:bg-orange-600",
    selectedColor: "bg-orange-700",
  },
  {
    name: "Art Therapy",
    color: "bg-green-500 hover:bg-green-600",
    selectedColor: "bg-green-700",
  },
  {
    name: "Sports",
    color: "bg-red-500 hover:bg-red-600",
    selectedColor: "bg-red-700",
  },
  {
    name: "Technology",
    color: "bg-blue-600 hover:bg-blue-700",
    selectedColor: "bg-blue-800",
  },
];

const CategoryButtons = ({ onCategoryChange, selectedCategory = "All" }) => {
  const handleCategoryClick = (category) => {
    onCategoryChange(category);
  };

  return (
    <div className="w-full">
      <div className="category-buttons-container flex gap-2 flex-wrap pb-2 px-4">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.name;
          const buttonColor = isSelected
            ? category.selectedColor
            : category.color;

          return (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category)}
              className={`${buttonColor} text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 whitespace-nowrap min-w-fit border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-500 flex-shrink-0`}
              style={{ height: "56px", minWidth: "140px" }}
            >
              {category.name}
              {category.isOfficial && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryButtons;
