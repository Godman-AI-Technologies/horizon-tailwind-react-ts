import Cookies from "js-cookie";
import { MdDeleteOutline } from "react-icons/md";
import React, { useState, useEffect, useRef } from "react";

interface ILLMMessage {
  content: string;
  role: string;
}

interface ILLMResponse {
  model: string;
  message: ILLMMessage;
  finish_reason: string;
  usage: {
    input_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

const isILLMResponse = (data: any): data is ILLMResponse => {
  return (
    typeof data === "object" &&
    typeof data.model === "string" &&
    typeof data.message === "object" &&
    typeof data.message.content === "string" &&
    typeof data.message.role === "string" &&
    typeof data.finish_reason === "string" &&
    typeof data.usage === "object" &&
    typeof data.usage.input_tokens === "number" &&
    typeof data.usage.completion_tokens === "number" &&
    typeof data.usage.total_tokens === "number"
  );
};

interface ChatProps {
  className?: string;
  inputPlaceholder?: string;
  buttonText?: string;
}

const Chat: React.FC<ChatProps> = ({
  className = "",
  inputPlaceholder = "Type your message...",
  buttonText = "Send",
}) => {
  const [messages, setMessages] = useState<ILLMMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);

  // Function to fetch chat history from API
  const fetchChatHistory = async () => {
    try {
      const assistantChat = Cookies.get("assistantChat");
      if (assistantChat) {
        setMessages(JSON.parse(assistantChat));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Function to send a new message to the API
  const sendMessage = async (event: any) => {
    event.preventDefault();

    // Check if the newMessage is empty
    if (!newMessage.trim()) {
      return;
    }

    const requestMessage = newMessage;

    setMessages((val) => [...val, { role: "user", content: requestMessage }]);
    setNewMessage("");
    setTyping(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_USER_API}/agents/${process.env.REACT_APP_ASSISTANT_ID}/llm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, { content: requestMessage, role: "user" }],
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to get agents");
      }
      const data = await response.json();
      if (!isILLMResponse(data)) {
        throw new Error("Response format is incorrect");
      }
      setMessages((val) => [...val, data.message]);
    } catch (err) {
      console.error(err);
    }
    setTyping(false);
  };

  // Function to clear all messages
  const clearMessages = () => {
    setMessages([]);
    Cookies.remove("assistantChat");
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
    Cookies.set("assistantChat", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (typing && typingRef.current) {
      typingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [typing]);

  return (
    <div className={`p-4 ${className}`}>
      <div className="hide-scrollbar flex h-[60vh] flex-col overflow-auto rounded p-0.5">
        {messages.map((message, index) => (
          <div
            key={index}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            className={
              "max-w-[40ch] rounded-xl px-3 py-2 outline outline-2 outline-brand-500 " +
              (message.role === "user"
                ? "mb-2 self-end bg-white dark:bg-navy-800"
                : "mb-3 self-start bg-brand-400 text-gray-100")
            }
          >
            {message.content}
          </div>
        ))}
        {typing ? (
          <div
            ref={typingRef}
            className="mt-2 flex h-max items-center justify-center space-x-1 self-start py-2"
          >
            <span className="sr-only">Loading...</span>
            <div className="h-4 w-4 animate-bounce rounded-full bg-brand-400 [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 animate-bounce rounded-full bg-brand-400 [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 animate-bounce rounded-full bg-brand-400"></div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <form onSubmit={sendMessage} className="relative mt-4 flex items-center">
        <button
          type="button"
          onClick={clearMessages}
          className="m-1 mr-2 rounded-full bg-brand-300/0 p-2 text-brand-300 transition-all hover:bg-brand-300/20"
        >
          <MdDeleteOutline className="h-6 w-6"></MdDeleteOutline>
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full rounded-full p-3 outline outline-2 outline-gray-500 focus:outline-brand-500 dark:bg-navy-800"
          placeholder={inputPlaceholder}
        />
        <button
          type="submit"
          className="absolute right-0 m-1 -ml-1.5 rounded-full bg-brand-500 p-2 text-white transition-all hover:bg-brand-500/80 disabled:bg-gray-500 dark:disabled:bg-gray-700"
          disabled={!newMessage.trim()}
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default Chat;
