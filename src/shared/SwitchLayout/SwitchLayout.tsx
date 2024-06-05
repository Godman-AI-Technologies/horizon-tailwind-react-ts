import React, { useState } from "react";

interface ISide {
  title: string;
  component: React.ReactNode;
}

interface LayoutProps {
  leftSide: ISide;
  rightSide: ISide;
}

const SwitchLayout: React.FC<LayoutProps> = ({ leftSide, rightSide }) => {
  const [selectedColumn, setSelectedColumn] = useState<"left" | "right">(
    "left"
  );

  return (
    <div className="mt-3 flex flex-col md:flex-row">
      <div className="mb-4 flex w-full justify-center md:hidden">
        <div className="flex w-full overflow-hidden rounded-full bg-gray-200">
          <button
            className={`flex-1 px-4 py-2 ${
              selectedColumn === "left"
                ? "bg-blue-500 text-white"
                : "text-black bg-gray-200"
            }`}
            onClick={() => setSelectedColumn("left")}
          >
            {leftSide.title}
          </button>
          <button
            className={`flex-1 px-4 py-2 ${
              selectedColumn === "right"
                ? "bg-blue-500 text-white"
                : "text-black bg-gray-200"
            }`}
            onClick={() => setSelectedColumn("right")}
          >
            {rightSide.title}
          </button>
        </div>
      </div>
      <div
        className={`flex-1 ${
          selectedColumn === "left" ? "block" : "hidden"
        } md:block`}
      >
        {leftSide.component}
      </div>
      <div
        className={`flex-1 ${
          selectedColumn === "right" ? "block" : "hidden"
        } md:block`}
      >
        {rightSide.component}
      </div>
    </div>
  );
};

export default SwitchLayout;
