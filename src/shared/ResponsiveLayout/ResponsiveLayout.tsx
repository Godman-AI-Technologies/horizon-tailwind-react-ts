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

  const handleMouseDown = (
    e: React.MouseEvent,
    column: "leftDivider" | "rightDivider" | "tabletDivider"
  ) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidths = {
      left: leftWidth,
      center: centerWidth,
      right: rightWidth,
      tabletLeft: tabletLeftWidth,
      tabletRight: tabletRightWidth,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaWidth = deltaX / window.innerWidth;

      const maxDelta = 0.1; // Максимальное изменение ширины - 10%

      if (column === "leftDivider") {
        const newLeftWidth = Math.max(
          0.1,
          Math.min(0.9, startWidths.left + deltaWidth)
        );
        const newCenterWidth = Math.max(
          0.1,
          Math.min(0.9, startWidths.center - deltaWidth)
        );

        if (
          Math.abs(newLeftWidth - startWidths.left) <= maxDelta &&
          Math.abs(newCenterWidth - startWidths.center) <= maxDelta
        ) {
          setLeftWidth(newLeftWidth);
          setCenterWidth(newCenterWidth);
        }
      } else if (column === "rightDivider") {
        const newCenterWidth = Math.max(
          0.1,
          Math.min(0.9, startWidths.center + deltaWidth)
        );
        const newRightWidth = Math.max(
          0.1,
          Math.min(0.9, startWidths.right - deltaWidth)
        );

        if (
          Math.abs(newCenterWidth - startWidths.center) <= maxDelta &&
          Math.abs(newRightWidth - startWidths.right) <= maxDelta
        ) {
          setCenterWidth(newCenterWidth);
          setRightWidth(newRightWidth);
        }
      } else if (column === "tabletDivider") {
        const newTabletLeftWidth = Math.max(
          0.1,
          Math.min(0.9, startWidths.tabletLeft + deltaWidth)
        );
        const newTabletRightWidth = Math.max(
          0.1,
          Math.min(0.9, startWidths.tabletRight - deltaWidth)
        );

        if (
          Math.abs(newTabletLeftWidth - startWidths.tabletLeft) <= maxDelta &&
          Math.abs(newTabletRightWidth - startWidths.tabletRight) <= maxDelta
        ) {
          setTabletLeftWidth(newTabletLeftWidth);
          setTabletRightWidth(newTabletRightWidth);
        }
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

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
        <div style={{ width: `${tabletLeftWidth * 100}%` }}>
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
        <div
          className="cursor-col-resize"
          onMouseDown={(e) => handleMouseDown(e, "tabletDivider")}
          style={{ width: "5px", backgroundColor: "gray", height: "100%" }}
        />
        <div style={{ width: `${tabletRightWidth * 100}%` }}>
          {centerSide.component}
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden h-full w-full lg:flex">
        <div style={{ width: `${leftWidth * 100}%` }}>{leftSide.component}</div>
        <div
          className="cursor-col-resize"
          onMouseDown={(e) => handleMouseDown(e, "leftDivider")}
          style={{ width: "5px", backgroundColor: "gray", height: "100%" }}
        />
        <div style={{ width: `${centerWidth * 100}%` }}>
          {centerSide.component}
        </div>
        <div
          className="cursor-col-resize"
          onMouseDown={(e) => handleMouseDown(e, "rightDivider")}
          style={{ width: "5px", backgroundColor: "gray", height: "100%" }}
        />
        <div style={{ width: `${rightWidth * 100}%` }}>
          {rightSide.component}
        </div>
      </div>
    </div>
  );
};
