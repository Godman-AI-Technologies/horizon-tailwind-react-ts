import { IAgentResponse } from "app/types";
import { fetchData } from "app/utils/fetch/request";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ResponsiveLayout } from "shared/ResponsiveLayout";
import { LayoutWrapper } from "widgets/LayoutWrapper";

export const AgentLayout: React.FC = () => {
  document.documentElement.dir = "agents";
  const { id } = useParams();

  useEffect(() => {
    setTimeout(async () => {
      try {
        const token = Cookies.get("accessToken");
        const url = process.env.REACT_APP_USER_API + `/agents/${id}`;
        const agent = await fetchData<IAgentResponse>(url, "GET", token);
        console.log("AGENT", agent);
      } catch (error) {
        console.error("Error on fetching agent:", error);
      }
    });
  }, [id]);

  return (
    <LayoutWrapper>
      <ResponsiveLayout
        leftSide={{ title: "Left", component: <div>left</div> }}
        centerSide={{ title: "center", component: <div>center</div> }}
        rightSide={{ title: "right", component: <div>right</div> }}
      />
    </LayoutWrapper>
  );
};
