import React, { useState } from "react";
import { Divider } from "./components/Divider";
import { IWidth, IWidthSetters } from "./types/interfaces";

interface ISide {
  title: string;
  component: React.ReactNode;
}

interface LayoutProps {
  leftSide: ISide;
  centerSide: ISide;
  rightSide: ISide;
}

export const ResponsiveLayout: React.FC<LayoutProps> = ({
  leftSide,
  centerSide,
  rightSide,
}) => {
  const [selectedColumn, setSelectedColumn] = useState<
    "left" | "center" | "right"
  >("left");
  const [leftWidth, setLeftWidth] = useState(1 / 3);
  const [centerWidth, setCenterWidth] = useState(1 / 3);
  const [rightWidth, setRightWidth] = useState(1 / 3);

  const [tabletLeftWidth, setTabletLeftWidth] = useState(1 / 2);
  const [tabletRightWidth, setTabletRightWidth] = useState(1 / 2);

  const startWidth: IWidth = {
    left: leftWidth,
    center: centerWidth,
    right: rightWidth,
    tabletLeft: tabletLeftWidth,
    tabletRight: tabletRightWidth,
  };

  const widthSetters: IWidthSetters = {
    setLeftWidth,
    setCenterWidth,
    setRightWidth,
    setTabletLeftWidth,
    setTabletRightWidth,
  };

  return (
    <div className="flex h-full w-full flex-col md:flex-row">
      {/* Mobile layout */}
      <div className="h-full">
        <div className="flex w-full justify-center bg-red-200 md:hidden">
          <div className="flex w-full overflow-hidden bg-gray-200">
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
        <div className="h-full md:hidden">
          {selectedColumn === "left" && leftSide.component}
          {selectedColumn === "center" && centerSide.component}
          {selectedColumn === "right" && rightSide.component}
        </div>
      </div>

      {/* Tablet layout */}
      <div className="hidden w-full md:flex lg:hidden">
        <div style={{ width: `${tabletLeftWidth * 100}%` }}>
          <div className="flex items-center justify-between">
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

          <div className="h-full">
            {selectedColumn === "left" || selectedColumn === "center"
              ? leftSide.component
              : rightSide.component}
          </div>
        </div>
        <Divider
          column="tabletDivider"
          startWidths={startWidth}
          widthSetters={widthSetters}
        />
        <div style={{ width: `${tabletRightWidth * 100}%` }}>
          {centerSide.component}
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden h-full w-full lg:flex">
        <div style={{ width: `${leftWidth * 100}%` }}>{leftSide.component}</div>
        <Divider
          column="leftDivider"
          startWidths={startWidth}
          widthSetters={widthSetters}
        />
        <div style={{ width: `${centerWidth * 100}%` }}>
          {centerSide.component}
        </div>
        <Divider
          column="rightDivider"
          startWidths={startWidth}
          widthSetters={widthSetters}
        />
        <div style={{ width: `${rightWidth * 100}%` }}>
          {rightSide.component}
        </div>
      </div>
    </div>
  );
};
