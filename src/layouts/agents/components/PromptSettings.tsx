import { IAgentRequest, IPromptProp } from "app/types";
import { ChangeEvent } from "react";
import { useEffect } from "react";
import { SwitchLayout } from "shared/SwitchLayout";

type THandleChange = (e: ChangeEvent<HTMLInputElement>) => void;

interface IPromptSettings {
  agent: IAgentRequest;
  handleChange: THandleChange;
  promptProps: IPromptProp[];
}

interface IBasicProps {
  agent: IAgentRequest;
  promptFields: { promptProp: string; data: string }[];
  promptProps: IPromptProp[];
  handleChange: THandleChange;
}

const BasicPrompt: React.FC<IBasicProps> = ({
  agent,
  promptProps,
  promptFields,
  handleChange,
}) => {
  const basicPromptInputs = promptProps
    .filter((prop) => prop.type === "basic")
    .map((prop) => {
      const matchedField = promptFields.find(
        (field) => field.promptProp === prop._id
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
              name={`prompt.${field.promptProp._id}`}
              onChange={handleChange}
              value={
                agent?.prompt?.system?.promptFields.find(
                  (el) => el.promptProp === field.promptProp._id
                )?.data
              }
              className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
    </div>
  );
};

interface IAdvancedProps {
  advancedField: { promptProp: string; data: string };
  handleChange: THandleChange;
}
const AdvancedPrompt: React.FC<IAdvancedProps> = ({
  advancedField,
  handleChange,
}) => {
  return (
    <div key={advancedField?.promptProp} className="flex flex-col">
      <label className="mb-2 text-lg font-medium text-gray-700">Advanced</label>
      <input
        type="text"
        name={`prompt.${advancedField?.promptProp}`}
        onChange={handleChange}
        value={advancedField?.data}
        className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export const PromptSettings: React.FC<IPromptSettings> = ({
  agent,
  handleChange,
  promptProps,
}) => {
  const advancedId = promptProps.find((prop) => prop.type === "advanced")?._id;

  const promptType: string = agent?.prompt?.system?.type || "basic";
  const promptFields: { promptProp: string; data: string }[] =
    agent?.prompt?.system?.promptFields || [];

  useEffect(() => {
    setTimeout(async () => {});
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
                agent={agent}
                handleChange={handleChange}
                promptProps={promptProps}
                promptFields={promptFields}
              />
            ),
          },
          {
            title: "Advanced",
            component: (
              <AdvancedPrompt
                handleChange={handleChange}
                advancedField={promptFields.find(
                  (field) => field.promptProp === advancedId
                )}
              />
            ),
          },
        ]}
      />
    </>
  );
};
