import { IAgentResponse, IPrompt, IPromptField, IPromptProp } from "app/types";
import { fetchData } from "app/utils/fetch/request";
import { useEffect, useState } from "react";
import { SwitchLayout } from "shared/SwitchLayout";

interface IPromptSettings {
  prompt: IPrompt;
}

interface IBasicProps {
  promptFields: IPromptField[];
  promptProps: IPromptProp[];
}

const BasicPrompt: React.FC<IBasicProps> = ({ promptProps, promptFields }) => {
  const basicPromptInputs = promptProps
    .filter((prop) => prop.type === "basic")
    .map((prop) => {
      const matchedField = promptFields.find(
        (field) => field.promptProp._id === prop._id
      );
      return { promptProp: prop, data: matchedField?.data };
    });
  return (
    <div>
      {basicPromptInputs &&
        basicPromptInputs.map((field) => (
          <div key={field.promptProp._id} className="flex flex-col">
            <label className="mb-2 text-lg font-medium text-gray-700">
              {field.promptProp.label}
            </label>
            <input
              type="text"
              value={field?.data}
              className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
    </div>
  );
};

interface IAdvancedProps {
  advancedProp: IPromptProp;
  advancedFiels: IPromptField;
}
const AdvancedPrompt: React.FC<IAdvancedProps> = ({ advancedFiels }) => {
  return (
    <textarea
      className="bg-transparent relative box-border h-full w-full cursor-text select-text resize-none whitespace-pre-wrap break-words border-0 p-[5px_12px] align-bottom font-sans text-sm leading-[22px] shadow-none outline-none"
      placeholder="Type something..."
    >
      {advancedFiels?.data || ""}
    </textarea>
  );
};

export const PromptSettings: React.FC<IPromptSettings> = ({ prompt }) => {
  const [promptProps, setPromptProps] = useState<IPromptProp[]>([]);

  const promptType: string = prompt?.system?.type || "basic";
  const promptFields: IPromptField[] = prompt?.system?.promptFields || [];

  useEffect(() => {
    setTimeout(async () => {
      try {
        const url =
          process.env.REACT_APP_USER_API + `/agents/prompt-properties`;
        const properties = await fetchData<IPromptProp[]>(url, "GET");
        setPromptProps(properties);
      } catch (error) {
        console.error("Error on fetching agent:", error);
      }
    });
  }, []);
  return (
    <>
      <header className="h-8 text-center text-xl font-bold">
        Props Settings : {promptType || "Unknown type"}
      </header>
      <SwitchLayout
        sides={[
          {
            title: "Baic",
            component: (
              <BasicPrompt
                promptProps={promptProps}
                promptFields={promptFields}
              />
            ),
          },
          {
            title: "Advenced",
            component: (
              <AdvancedPrompt
                advancedProp={promptProps.find(
                  (prop) => prop.type === "advanced"
                )}
                advancedFiels={promptFields.find(
                  (field) => field.promptProp.type === "advanced"
                )}
              />
            ),
          },
        ]}
      />
    </>
  );
};
