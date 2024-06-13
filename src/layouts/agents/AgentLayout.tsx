import { IAgentResponse } from "app/types";
import { fetchData } from "app/utils/fetch/request";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ResponsiveLayout } from "shared/ResponsiveLayout";
import { SwitchLayout } from "shared/SwitchLayout";
import { LayoutWrapper } from "widgets/LayoutWrapper";

interface IAgentLayoutProps {
  type: "create" | "update";
}

export const AgentLayout: React.FC<IAgentLayoutProps> = ({ type }) => {
  document.documentElement.dir = "agents";
  const { id } = useParams();

  const [agent, setAgent] = useState<IAgentResponse>({ name: "Unknown" });

  useEffect(() => {
    if (type === "create") return;
    setTimeout(async () => {
      try {
        const token = Cookies.get("accessToken");
        const url = process.env.REACT_APP_USER_API + `/agents/${id}`;
        const agent = await fetchData<IAgentResponse>(url, "GET", token);
        console.log("AGENT", agent);
        setAgent(agent);
      } catch (error) {
        console.error("Error on fetching agent:", error);
      }
    });
  }, [id, type]);

  return (
    <LayoutWrapper name={agent.name}>
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
                  { title: "Baic", component: <div>Basic</div> },
                  { title: "Advenced", component: <div>Advenced</div> },
                ]}
              />
            </div>
          ),
        }}
        centerSide={{ title: "center", component: <div>center</div> }}
        rightSide={{
          title: "right",
          component: <div className="h-full bg-red-300">right</div>,
        }}
      />
    </LayoutWrapper>
  );
};
