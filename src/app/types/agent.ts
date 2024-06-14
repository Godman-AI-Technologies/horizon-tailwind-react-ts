import { ITriggerResponse } from "./trigger";

interface ILanguageModelVersion {
  _id: string;
  languageModel: string;
  versionId: string;
  contextWindowLimit: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IPromptField {
  promptProp: {
    _id: string;
    label: string;
    prefix: string;
    type: string;
    depricated: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  data: string;
}

export interface IPrompt {
  system: {
    type: string;
    promptFields: IPromptField[];
  };
  maxTokens: 1000;
  temperature: 0.5;
}

export interface IAgentResponse {
  _id?: string;
  name: string;
  isPrivate?: boolean;
  profileId?: string;
  languageModelVersion?: ILanguageModelVersion;
  contributors?: string[];
  description?: string;
  knowledgeBase?: string[];
  knowledgeVector?: string[];
  plugins?: string[];
  prompt?: IPrompt;
  triggers?: ITriggerResponse[];
  createdAt?: Date;
  updatedAt?: Date;
}
