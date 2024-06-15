import {
  IAgentRequest,
  IAgentResponse,
  IPrompt,
  IPromptField,
} from "app/types";
import { fetchData } from "app/utils/fetch/request";
import { generateUniqueText } from "app/utils/random/agent";
import FullScreenLoader from "entities/FullScreenLoader/FullScreenLoader";
import Cookies from "js-cookie";
import { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ResponsiveLayout } from "shared/ResponsiveLayout";
import { LayoutWrapper } from "widgets/LayoutWrapper";
import { PromptSettings } from "./components/PromptSettings";

interface IAgentLayoutProps {
  type: "create" | "update";
}

export const AgentLayout: React.FC<IAgentLayoutProps> = ({ type }) => {
  document.documentElement.dir = "agents";
  const navigate = useNavigate();
  const { id } = useParams();

  const [agent, setAgent] = useState<IAgentRequest>({
    name: "",
    description: "",
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
      maxTokens: 1,
      temperature: 2,
    },
  });
  // const [isChanged, setIsChanged] = useState(false);

  const uniqueText = generateUniqueText();

  const [temporaryName, setTemporaryName] = useState(uniqueText);
  const [temporaryDescription, setTemporaryDescription] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [mainKey, subKey] = name.split(".");

    setAgent((prevAgentData) => {
      let newAgentData;
      if (mainKey === "prompt") {
        newAgentData = {
          ...prevAgentData,
          prompt: {
            ...prevAgentData?.prompt,
            system: {
              ...prevAgentData?.prompt?.system,
              promptFields: [
                ...(prevAgentData.prompt?.system?.promptFields || []),
              ],
            },
          },
        };
        const updatedElement = newAgentData.prompt.system.promptFields.find(
          (el) => el.promptProp === subKey
        );
        if (updatedElement) {
          updatedElement.data = value;
        } else {
          newAgentData.prompt.system.promptFields.push({
            promptProp: subKey,
            data: value,
          });
        }
      } else {
        newAgentData = {
          ...prevAgentData,
          [name]: value,
        };
      }
      return newAgentData;
    });
  };

  useEffect(() => {
    if (type === "create") return;
    setTimeout(async () => {
      try {
        const token = Cookies.get("accessToken");
        const url = process.env.REACT_APP_USER_API + `/agents/${id}`;
        const agent = await fetchData<IAgentResponse>(url, "GET", token);
        console.log(agent);

        setAgent({
          name: agent.name,
          description: agent.description,
          languageModelVersion: "661ce97572c213f85ecd6fc1",
          prompt: {
            ...agent?.prompt,
            system: {
              ...agent?.prompt?.system,
              promptFields:
                agent.prompt?.system?.promptFields.map((field) => ({
                  promptProp: field.promptProp._id,
                  data: field?.data,
                })) || [],
            },
          },
        });
        setTemporaryName(agent.name);
        setTemporaryDescription(agent.description);
      } catch (error) {
        console.error("Error on fetching agent:", error);
      }
    });
  }, [id, type]);

  const updateSubmitHandler = async () => {
    try {
      const token = Cookies.get("accessToken");
      const url = process.env.REACT_APP_USER_API + `/agents/${id}`;
      const updatedAgent = await fetchData<IAgentResponse>(
        url,
        "PUT",
        token,
        agent
      );
      setTemporaryName(updatedAgent.name);
      setTemporaryDescription(updatedAgent.description);
    } catch (error) {
      console.error("Error on fetching agent:", error);
    }
  };

  const createSubmitHandler = async () => {
    try {
      const token = Cookies.get("accessToken");
      const profileId = Cookies.get("profileId");
      const url = process.env.REACT_APP_USER_API + `/agents/${profileId}`;
      const createdAgent = await fetchData<IAgentRequest>(url, "POST", token, {
        name: agent.name,
        description: agent.description,
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
      navigate(createdAgent._id);
    } catch (error) {
      console.error("Error on fetching agent:", error);
    }
  };

  return (
    <>
      {agent || type === "create" ? (
        <LayoutWrapper
          name={agent.name}
          isUpdate={type === "update"}
          backwardPath="/admin/dashboard/agents"
          modalSubmitHandler={() => {
            setAgent({
              ...agent,
              name: temporaryName,
              description: temporaryDescription,
            });
          }}
          modalCloseHandler={() => {
            setTemporaryName(agent.name);
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
                <PromptSettings agent={agent} handleChange={handleChange} />
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
