import { IAgentResponse, IPromptField, IPromptProp } from "app/types";
import { fetchData } from "app/utils/fetch/request";
import FullScreenLoader from "entities/FullScreenLoader/FullScreenLoader";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ResponsiveLayout } from "shared/ResponsiveLayout";
import { LayoutWrapper } from "widgets/LayoutWrapper";
import { PromptSettings } from "./components/PromptSettings";
import { getAdvancedPrompt, getBasicPromptUIFields } from "./utils/prompt";

interface IAgentLayoutProps {
  type: "create" | "update";
}

export const AgentLayout: React.FC<IAgentLayoutProps> = ({ type }) => {
  document.documentElement.dir = "agents";
  const navigate = useNavigate();
  const { id } = useParams();

  const [agent, setAgent] = useState<IAgentResponse>(null);

  const [temporaryName, setTemporaryName] = useState("");
  const [temporaryDescription, setTemporaryDescription] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [promptType, setPromptType] = useState("basic");
  const [advancedPrompt, setAdvancedPrompt] = useState<IPromptField>();
  const [promptFields, setPromptFields] = useState<IPromptField[]>([]);

  useEffect(() => {
    if (type === "create") return;
    setTimeout(async () => {
      try {
        const token = Cookies.get("accessToken");
        const url = process.env.REACT_APP_USER_API + `/agents/${id}`;
        const agent = await fetchData<IAgentResponse>(url, "GET", token);
        console.log(agent);
        setAgent(agent);
        setName(agent.name);
        setTemporaryName(agent.name);
        setDescription(agent.description);
        setTemporaryDescription(agent.description);
        setPromptType(agent?.prompt?.system?.type);
        setPromptFields(
          getBasicPromptUIFields(agent?.prompt?.system?.promptFields)
        );
        setAdvancedPrompt(
          getAdvancedPrompt(agent?.prompt?.system?.promptFields)
        );
      } catch (error) {
        console.error("Error on fetching agent:", error);
      }
    });
  }, [id, type]);

  const updateSubmitHandler = async () => {
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

  const createSubmitHandler = async () => {
    try {
      const token = Cookies.get("accessToken");
      const profileId = Cookies.get("profileId");
      const url = process.env.REACT_APP_USER_API + `/agents/${profileId}`;
      const agent = await fetchData<IAgentResponse>(url, "POST", token, {
        name,
        description,
        languageModelVersion: "661ce97572c213f85ecd6fc1",
        prompt: {
          system: {
            type: "basic",
            promptFields: [
              {
                promptProp: "66322bc1d58f34fe05c63b65",
                data: "assistant of chocolate factory",
              },
            ],
          },
          temperature: 0.6,
        },
        contributors: [],
      });
      console.log("await", agent);
      navigate(agent._id);
    } catch (error) {
      console.error("Error on fetching agent:", error);
    }
  };

  const getPromptProperties = async () => {
    try {
      const url = process.env.REACT_APP_USER_API + `/agents/prompt-properties`;
      const properties = await fetchData<IAgentResponse>(url, "GET");
      console.log("PROPS", properties);
    } catch (error) {
      console.error("Error on fetching agent:", error);
    }
  };

  return (
    <>
      {agent || type === "create" ? (
        <LayoutWrapper
          name={name}
          isUpdate={type === "update"}
          backwardPath="/admin/dashboard/agents"
          modalSubmitHandler={() => {
            setName(temporaryName);
            setDescription(temporaryDescription);
          }}
          submitHandler={
            type === "update" ? updateSubmitHandler : createSubmitHandler
          }
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
              component: (
                <PromptSettings
                  promptType={promptType}
                  promptFields={promptFields}
                  advacedPrompt={advancedPrompt}
                />
              ),
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
