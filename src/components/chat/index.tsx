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

    try {
      const response = await fetch(
        `${process.env.REACT_APP_USER_API}/agents/${process.env.REACT_APP_ASSISTANT_ID}/llm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, { content: newMessage, role: "user" }],
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
      await setMessages((val) => [
        ...val,
        { role: "user", content: newMessage },
        data.message,
      ]);
      Cookies.set("assistantChat", JSON.stringify(messages));
    } catch (err) {
      console.error(err);
    }
    setNewMessage("");
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  return (
    <div className="p-4">
      <div className="h-64 overflow-auto rounded p-4">
        {messages.map((message, index) => (
          <p key={index} className="mb-1">
            {message.content}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage} className="mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full rounded border p-2"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="mt-2 rounded bg-blue-500 p-2 text-white"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
