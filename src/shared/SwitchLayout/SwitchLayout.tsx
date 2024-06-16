import React, { useState } from "react";

interface ISide {
  title: string;
  component: React.ReactNode;
}

interface LayoutProps {
  sides: ISide[];
}

export const SwitchLayout: React.FC<LayoutProps> = ({ sides }) => {
  const [selectedColumn, setSelectedColumn] = useState<number>(0);

  return (
    <div className="flex h-full flex-col">
      <div className="flex w-full justify-center">
        <div className="flex w-full overflow-hidden bg-gray-200">
          {sides.map((side, index) => (
            <button
              key={index}
              className={`flex-1 px-4 py-2 ${
                selectedColumn === index
                  ? "bg-blue-500 text-white"
                  : "text-black bg-gray-200"
              }`}
              onClick={() => setSelectedColumn(index)}
            >
              {side.title}
            </button>
          ))}
        </div>
      </div>
      {sides.map((side, index) => (
        <div
          key={index}
          className={`h-full flex-1 ${
            selectedColumn === index ? "block" : "hidden"
          }`}
        >
          {side.component}
        </div>
      ))}
    </div>
  );
};
