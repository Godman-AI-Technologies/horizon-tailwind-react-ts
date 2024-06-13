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
    <div className="mt-3 flex flex-col md:flex-row">
      <div className="mb-4 flex w-full justify-center md:hidden">
        <div className="flex w-full overflow-hidden rounded-full bg-gray-200">
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
          className={`flex-1 ${
            selectedColumn === index ? "block" : "hidden"
          } md:block`}
        >
          {side.component}
        </div>
      ))}
    </div>
  );
};
