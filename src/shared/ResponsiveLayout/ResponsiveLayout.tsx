import React, { useState } from "react";

interface ISide {
  title: string;
  component: React.ReactNode;
}

interface LayoutProps {
  leftSide: ISide;
  centerSide: ISide;
  rightSide: ISide;
}

const SwitchLayout: React.FC<LayoutProps> = ({
  leftSide,
  centerSide,
  rightSide,
}) => {
  const [selectedColumn, setSelectedColumn] = useState<
    "left" | "center" | "right"
  >("left");

  return (
    <div className="mt-3 flex h-full w-full flex-col md:flex-row">
      {/* Mobile layout */}
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
              selectedColumn === "center"
                ? "bg-blue-500 text-white"
                : "text-black bg-gray-200"
            }`}
            onClick={() => setSelectedColumn("center")}
          >
            {centerSide.title}
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
      <div className="md:hidden">
        {selectedColumn === "left" && <div>{leftSide.component}</div>}
        {selectedColumn === "center" && <div>{centerSide.component}</div>}
        {selectedColumn === "right" && <div>{rightSide.component}</div>}
      </div>

      {/* Tablet layout */}
      <div className="hidden w-full md:flex lg:hidden">
        <div className="w-1/2">
          <div className="mb-4 flex items-center justify-between">
            <button
              className={`flex-1 px-4 py-2 ${
                selectedColumn === "left" || selectedColumn === "center"
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
          <div>
            {selectedColumn === "left" || selectedColumn === "center"
              ? leftSide.component
              : rightSide.component}
          </div>
        </div>
        <div className="w-1/2">{centerSide.component}</div>
      </div>

      {/* Desktop layout */}
      <div className="hidden h-full w-full lg:flex">
        <div className="w-1/3">{leftSide.component}</div>
        <div className="w-1/3">{centerSide.component}</div>
        <div className="w-1/3">{rightSide.component}</div>
      </div>
    </div>
  );
};

export default SwitchLayout;
