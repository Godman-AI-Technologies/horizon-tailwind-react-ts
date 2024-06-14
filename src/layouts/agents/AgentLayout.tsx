import { IAgentResponse } from "app/types";
import { fetchData } from "app/utils/fetch/request";
import FullScreenLoader from "entities/FullScreenLoader/FullScreenLoader";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ResponsiveLayout } from "shared/ResponsiveLayout";
import { LayoutWrapper } from "widgets/LayoutWrapper";
import { PromptSettings } from "./components/PromptSettings";

interface IAgentLayoutProps {
  type: "create" | "update";
}

export const AgentLayout: React.FC<IAgentLayoutProps> = ({ type }) => {
  document.documentElement.dir = "agents";
  const { id } = useParams();

  const [agent, setAgent] = useState<IAgentResponse>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [temporaryName, setTemporaryName] = useState("");
  const [temporaryDescription, setTemporaryDescription] = useState("");

  useEffect(() => {
    if (type === "create") return;
    setTimeout(async () => {
      try {
        const token = Cookies.get("accessToken");
        const url = process.env.REACT_APP_USER_API + `/agents/${id}`;
        const agent = await fetchData<IAgentResponse>(url, "GET", token);
        setAgent(agent);
        setName(agent.name);
        setTemporaryName(agent.name);
        setDescription(agent.description);
        setTemporaryDescription(agent.description);
      } catch (error) {
        console.error("Error on fetching agent:", error);
      }
    });
  }, [id, type]);

  const updateSubmitHandler = async () => {
    console.log("UPdate");
    try {
      const token = Cookies.get("accessToken");
      const url = process.env.REACT_APP_USER_API + `/agents/${id}`;
      const agent = await fetchData<IAgentResponse>(url, "PUT", token, {
        name,
        description,
      });
      setAgent(agent);
      setName(agent.name);
      setTemporaryName(agent.name);
      setDescription(agent.description);
      setTemporaryDescription(agent.description);
    } catch (error) {
      console.error("Error on fetching agent:", error);
    }
  };

  return (
    <>
      {agent ? (
        <LayoutWrapper
          name={name}
          isUpdate={type === "update"}
          backwardPath="/admin/dashboard/agents"
          modalSubmitHandler={() => {
            setName(temporaryName);
            setDescription(temporaryDescription);
          }}
          submitHandler={type === "update" ? updateSubmitHandler : () => {}}
          modalContent={
            <div className="flex flex-col">
              <label className="mb-2 text-lg font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setTemporaryName(e.target.value);
                }}
                value={temporaryName}
                className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="mb-2 text-lg font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setTemporaryDescription(e.target.value);
                }}
                value={temporaryDescription}
                className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          }
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
