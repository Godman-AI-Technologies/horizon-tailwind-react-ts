import { IPromptField } from "app/types";

export const getBasicPromptUIFields = (
  promptFields: IPromptField[]
): IPromptField[] => {
  return promptFields.filter((field) => field.promptProp.label !== "Advanced");
};

export const getAdvancedPrompt = (
  promptFields: IPromptField[]
): IPromptField => {
  return promptFields.find((field) => field.promptProp.label === "Advanced");
};
