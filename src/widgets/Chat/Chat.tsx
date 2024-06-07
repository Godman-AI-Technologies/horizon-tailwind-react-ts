import { ChatContent } from "./components/ChatContent";
import { ChatHeader } from "./components/ChatHeader";
import { ChatInput } from "./components/ChatInput";

export const Chat: React.FC = () => {
  return (
    <div className="fixed flex h-full w-full flex-col">
      <ChatHeader />
      <ChatContent />
      <ChatInput />
    </div>
  );
};
