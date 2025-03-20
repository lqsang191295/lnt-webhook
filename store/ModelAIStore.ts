import { create } from "zustand";
import { TypeModelAI } from "./types/model-ai";

interface ModelAIState {
  modelAI: TypeModelAI;
  setModelAI: (model: TypeModelAI) => void;
}

export const LIST_POPULAR_AI: TypeModelAI[] = [
  {
    name: "ChatGpt",
    icon: "/icons/chatgpt-icon.svg",
    models: [
      { key: "gpt-3.5-turbo", value: "GPT-3.5 Turbo" },
      { key: "gpt-4", value: "GPT-4" },
      { key: "gpt-4-turbo", value: "GPT-4-turbo" },
    ],
  },
  {
    name: "Gemini",
    icon: "/icons/google-gemini-icon.svg",
    models: [
      { key: "gemini-1.0-pro", value: "Gemini 1.0 Pro" },
      { key: "gemini-1.0-ultra", value: "Gemini 1.0 Ultra" },
      { key: "gemini-1.5-pro", value: "Gemini 1.5 Pro" },
      { key: "gemini-1.5-flash", value: "Gemini 1.5 Flash" },
    ],
  },
  {
    name: "Grok",
    icon: "/icons/grok-logo-icon.svg",
    models: [
      { key: "grok-1", value: "Grok-1" },
      { key: "grok-1.5", value: "Grok-1.5" },
    ],
  },
  {
    name: "Perplexity",
    icon: "/icons/perplexity-ai-icon.svg",
    models: [
      { key: "perplexity-ai-llm", value: "Perplexity AI LLM" },
      { key: "perplexity-hybrid-search", value: "Perplexity Hybrid Search" },
    ],
  },
  {
    name: "DeepSeek R1",
    icon: "/icons/deepseek-logo-icon.svg",
    models: [
      { key: "deepseek-r1", value: "DeepSeek R1" },
      { key: "deepseek-chat", value: "DeepSeek Chat" },
    ],
  },
  {
    name: "Manus",
    icon: "",
    models: [
      { key: "manus-ai-model-v1", value: "Manus AI Model V1" },
      { key: "manus-ai-model-v2", value: "Manus AI Model V2" },
    ],
  },
  {
    name: "Alibaba QwQ-32B",
    icon: "",
    models: [
      { key: "qwq-32b", value: "QwQ-32B" },
      { key: "qwq-32b-chat", value: "QwQ-32B-Chat" },
    ],
  },
  {
    name: "Tencent Yuanbao",
    icon: "",
    models: [
      { key: "yuanbao-1.0", value: "Yuanbao 1.0" },
      { key: "yuanbao-2.0", value: "Yuanbao 2.0" },
    ],
  },
];

export const useModelAIStore = create<ModelAIState>((set) => ({
  modelAI: LIST_POPULAR_AI[0],
  setModelAI: (state) => set({ modelAI: state }),
}));
