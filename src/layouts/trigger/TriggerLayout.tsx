import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ResponsiveLayout } from "shared/ResponsiveLayout";
import { LayoutWrapper } from "widgets/LayoutWrapper";

interface ITriggerLayoutProps {
  type: "create" | "update";
}

export const TriggerLayout: React.FC<ITriggerLayoutProps> = ({ type }) => {
  document.documentElement.dir = "agents";
  const { id } = useParams();

  useEffect(() => {
    if (type === "create" || !id) return;
    setTimeout(async () => {
      try {
        console.log("trigger");
      } catch (error) {
        console.error("Error on fetching trigger:", error);
      }
    });
  }, [id, type]);

  return (
    <LayoutWrapper
      name="Unknown"
      isUpdate={type === "update"}
      backwardPath="/admin/dashboard/triggers"
    >
      <ResponsiveLayout
        leftSide={{
          title: "Left",
          component: <div>triggers</div>,
        }}
        centerSide={{ title: "center", component: <div>center</div> }}
        rightSide={{
          title: "right",
          component: <div className="h-full bg-green-300">Info</div>,
        }}
      />
    </LayoutWrapper>
  );
};
