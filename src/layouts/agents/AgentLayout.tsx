import { ResponsiveLayout } from "shared/ResponsiveLayout";

export const AgentLayout: React.FC = () => {
  document.documentElement.dir = "agents";
  return (
    <ResponsiveLayout
      leftSide={{ title: "Left", component: <div>left</div> }}
      centerSide={{ title: "center", component: <div>center</div> }}
      rightSide={{ title: "right", component: <div>right</div> }}
    />
  );
};
