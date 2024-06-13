import { IWidth, IWidthSetters } from "../types/interfaces";

type TColumn = "leftDivider" | "rightDivider" | "tabletDivider";

interface IDividerProps {
  column: TColumn;
  startWidths: IWidth;
  widthSetters: IWidthSetters;
}

export const Divider: React.FC<IDividerProps> = ({
  column,
  startWidths,
  widthSetters,
}) => {
  const {
    setLeftWidth,
    setRightWidth,
    setCenterWidth,
    setTabletLeftWidth,
    setTabletRightWidth,
  } = widthSetters;

  const handleMouseDown = (e: React.MouseEvent, column: TColumn) => {
    e.preventDefault();
    const startX = e.clientX;

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
    <div>
      <div
        className="h-full w-2 cursor-col-resize"
        onMouseDown={(e) => handleMouseDown(e, column)}
      >
        <div className="h-full w-[2px] bg-gray-800"></div>
      </div>
    </div>
  );
};
