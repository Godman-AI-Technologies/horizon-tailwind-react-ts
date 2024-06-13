import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";

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

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);

  // Function to fetch chat history from API
  const fetchChatHistory = async () => {
    try {
      const assistantChat = Cookies.get("assistantChat");
      setMessages(JSON.parse(assistantChat));
    } catch (err) {
      console.error(err);
    }
  };

  // Function to send a new message to the API
  const sendMessage = async (event: any) => {
    event.preventDefault();

    const requestMessage = newMessage;

    await setMessages((val) => [
      ...val,
      { role: "user", content: requestMessage },
    ]);
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
      console.log(data);
      if (!isILLMResponse(data)) {
        throw new Error("Response format is incorrect");
      }
      console.log(data);
      await setMessages((val) => [...val, data.message]);
      Cookies.set("assistantChat", JSON.stringify(messages));
    } catch (err) {
      console.error(err);
    }
    setTyping(false);
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  return (
    <div className="p-4">
      <div className="flex h-[60vh] flex-col overflow-auto rounded p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              "max-w-[40ch] rounded-xl px-3 py-2 outline outline-2 outline-brand-500 " +
              (message.role === "user"
                ? "mb-3 self-end bg-white"
                : "mb-2 self-start bg-brand-400 text-gray-100")
            }
          >
            {message.content}
          </div>
        ))}
        {typing ? (
          <div className="mt-2 flex h-max items-center justify-center space-x-1 self-start py-2">
            <span className="sr-only">Loading...</span>
            <div className="h-4 w-4 animate-bounce rounded-full bg-brand-400 [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 animate-bounce rounded-full bg-brand-400 [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 animate-bounce rounded-full bg-brand-400"></div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <form onSubmit={sendMessage} className="relative mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full rounded-xl p-3 outline-2 outline-brand-500 focus:outline"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="absolute m-1 -ml-1.5 translate-x-[-100%] rounded-xl bg-brand-500 p-2 text-white"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
