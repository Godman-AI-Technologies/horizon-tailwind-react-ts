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

export interface IPromptProp {
  _id: string;
  label: string;
  prefix: string;
  type: string;
  depricated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPromptField {
  promptProp: IPromptProp;
  data: string;
}

export interface IPrompt {
  system: {
    type: string;
    promptFields: IPromptField[];
  };
  maxTokens: number;
  temperature: number;
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

export interface IAgentRequest {
  _id?: string;
  name: string;
  isPrivate?: boolean;
  profileId?: string;
  languageModelVersion: string;
  contributors?: string[];
  description?: string;
  knowledgeBase?: string[];
  knowledgeVector?: string[];
  plugins?: string[];
  prompt?: {
    system: {
      type: string;
      promptFields: {
        promptProp: string;
        data: string;
      }[];
    };
    maxTokens: number;
    temperature: number;
  };
  triggers?: ITriggerResponse[];
  createdAt?: Date;
  updatedAt?: Date;
}
