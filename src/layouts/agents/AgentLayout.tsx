import { ResponsiveLayout } from "shared/ResponsiveLayout";
import { LayoutWrapper } from "widgets/LayoutWrapper";

export const AgentLayout: React.FC = () => {
  document.documentElement.dir = "agents";
  return (
    <LayoutWrapper headerTitle="Agents">
      <ResponsiveLayout
        leftSide={{ title: "Left", component: <div>left</div> }}
        centerSide={{ title: "center", component: <div>center</div> }}
        rightSide={{ title: "right", component: <div>right</div> }}
      />
    </LayoutWrapper>
  );
};
