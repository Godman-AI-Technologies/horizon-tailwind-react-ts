import { ResponsiveLayout } from "shared/ResponsiveLayout";

export const AgentLayout: React.FC = () => {
  document.documentElement.dir = "agents";
  return (
    <div className="fixed h-full w-full bg-red-200">
      <header>Agents</header>
      <ResponsiveLayout
        leftSide={{ title: "Left", component: <div>left</div> }}
        centerSide={{ title: "center", component: <div>center</div> }}
        rightSide={{ title: "right", component: <div>right</div> }}
      />
    </div>
  );
};
