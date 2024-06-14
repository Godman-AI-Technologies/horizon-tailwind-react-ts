import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ResponsiveLayout } from "shared/ResponsiveLayout";
import { SwitchLayout } from "shared/SwitchLayout";
import { LayoutWrapper } from "widgets/LayoutWrapper";

interface IKnowledgeLayoutProps {
  type: "create" | "update";
}

export const KnowledgeLayout: React.FC<IKnowledgeLayoutProps> = ({ type }) => {
  document.documentElement.dir = "knowledge";
  const { id } = useParams();

  useEffect(() => {
    if (type === "create" || !id) return;
    setTimeout(async () => {
      try {
        console.log("KNOWLEDGE");
      } catch (error) {
        console.error("Error on fetching knowledge:", error);
      }
    });
  }, [id, type]);

  return (
    <LayoutWrapper
      name="Unknown"
      isUpdate={type === "update"}
      backwardPath="/admin/dashboard/knowledge"
    >
      <ResponsiveLayout
        leftSide={{
          title: "Left",
          component: (
            <div>
              <header className="h-8 text-center text-xl font-bold">
                Props Settings
              </header>
              <SwitchLayout
                sides={[
                  { title: "Parsing", component: <div>Parsing</div> },
                  { title: "File", component: <div>File</div> },
                ]}
              />
            </div>
          ),
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
