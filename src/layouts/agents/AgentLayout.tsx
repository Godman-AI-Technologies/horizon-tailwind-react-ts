import { IAgentResponse } from "app/types";
import { fetchData } from "app/utils/fetch/request";
import FullScreenLoader from "entities/FullScreenLoader/FullScreenLoader";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ResponsiveLayout } from "shared/ResponsiveLayout";
import { SwitchLayout } from "shared/SwitchLayout";
import { LayoutWrapper } from "widgets/LayoutWrapper";
import { PromptSettings } from "./components/PromptSettings";

interface IAgentLayoutProps {
  type: "create" | "update";
}

export const AgentLayout: React.FC<IAgentLayoutProps> = ({ type }) => {
  document.documentElement.dir = "agents";
  const { id } = useParams();

  const [agent, setAgent] = useState<IAgentResponse>(null);

  useEffect(() => {
    if (type === "create") return;
    setTimeout(async () => {
      try {
        const token = Cookies.get("accessToken");
        const url = process.env.REACT_APP_USER_API + `/agents/${id}`;
        const agent = await fetchData<IAgentResponse>(url, "GET", token);
        console.log(agent);
        setAgent(agent);
      } catch (error) {
        console.error("Error on fetching agent:", error);
      }
    });
  }, [id, type]);

  return (
    <>
      {agent ? (
        <LayoutWrapper
          name={agent.name}
          isUpdate={type === "update"}
          backwardPath="/admin/dashboard/agents"
          modalContent={<div>modal</div>}
        >
          <ResponsiveLayout
            leftSide={{
              title: "Left",
              component: <PromptSettings prompt={agent.prompt} />,
            }}
            centerSide={{ title: "center", component: <div>center</div> }}
            rightSide={{
              title: "right",
              component: <div className="h-full bg-red-300">right</div>,
            }}
          />
        </LayoutWrapper>
      ) : (
        <FullScreenLoader />
      )}
    </>
  );
};
