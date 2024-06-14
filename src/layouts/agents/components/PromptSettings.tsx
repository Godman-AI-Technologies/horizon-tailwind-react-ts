import { IPrompt } from "app/types";
import { SwitchLayout } from "shared/SwitchLayout";

interface IPromptSettings {
  prompt?: IPrompt;
}

const BasicPrompt: React.FC<IPromptSettings> = ({ prompt }) => {
  const promptFields = prompt?.system?.promptFields;
  return (
    <div>
      {promptFields &&
        promptFields
          .filter((field) => field.promptProp.label !== "Advanced")
          .map((field, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-2 text-lg font-medium text-gray-700">
                {field.promptProp.label}
              </label>
              <input
                type="text"
                value={field.data}
                className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
    </div>
  );
};

const AdvancedPrompt = () => {
  return (
    <textarea
      className="
      bg-transparent
      relative
      box-border
      h-full
      w-full
      cursor-text
      select-text
      resize-none
      whitespace-pre-wrap
      break-words
      border-0
      p-[5px_12px]
      align-bottom
      font-sans
      text-sm
      leading-[22px]
      shadow-none
      outline-none
    "
      placeholder="Type something..."
    ></textarea>
  );
};

export const PromptSettings: React.FC<IPromptSettings> = ({ prompt }) => {
  return (
    <>
      <header className="h-8 text-center text-xl font-bold">
        Props Settings : {prompt?.system?.type || "Unknown type"}
      </header>
      <SwitchLayout
        sides={[
          { title: "Baic", component: <BasicPrompt prompt={prompt} /> },
          { title: "Advenced", component: <AdvancedPrompt /> },
        ]}
      />
    </>
  );
};
