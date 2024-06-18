import { FaCopy } from "react-icons/fa";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

const Documentation = () => {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-3xl font-bold">
        Documentation for Open API to Get Response from LLM Agent
      </h1>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Description</h2>
        <p className="mb-2">
          This API provides the ability to send a request to an LLM agent and
          receive a response. The request is made to
        </p>
        <code className="rounded p-1">
          https://api-users.fewclicks.ru/api/agents/:agentId/public-llm
        </code>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">URL</h2>
        <div className="relative w-full rounded bg-gray-800 p-2 text-white">
          <code>
            https://api-users.fewclicks.ru/api/agents/:agentId/public-llm
          </code>
          <button
            className="absolute right-2 top-2"
            onClick={() =>
              copyToClipboard(
                "https://api-users.fewclicks.ru/api/agents/:agentId/public-llm"
              )
            }
          >
            <FaCopy />
          </button>
        </div>
        <p className="mt-2">
          <strong>:agentId</strong> — the identifier of the agent to which the
          request is directed.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Method</h2>
        <div className="relative rounded bg-gray-800 p-2 text-white">
          <code>POST</code>
          <button
            className="absolute right-2 top-2"
            onClick={() => copyToClipboard("POST")}
          >
            <FaCopy />
          </button>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Headers</h2>
        <div className="relative rounded bg-gray-800 p-2 text-white">
          <code>Content-Type: application/json</code>
          <button
            className="absolute right-2 top-2"
            onClick={() => copyToClipboard("Content-Type: application/json")}
          >
            <FaCopy />
          </button>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Request Body</h2>
        <p>
          The request body should contain the chat ID and an array of messages.
          Example request body:
        </p>
        <div className="relative rounded bg-gray-800 p-4 text-white">
          <code>
            <pre>{`{
  "chatId": "testId",
  "messages": [
    { "content": "ok", "role": "user" },
    { "content": "ok", "role": "assistant" },
    { "content": "ok", "role": "user" }
  ]
}`}</pre>
          </code>
          <button
            className="absolute right-2 top-2"
            onClick={() =>
              copyToClipboard(`{
  "chatId": "testId",
  "messages": [
    { "content": "ok", "role": "user" },
    { "content": "ok", "role": "assistant" },
    { "content": "ok", "role": "user" }
  ]
}`)
            }
          >
            <FaCopy />
          </button>
        </div>
        <h3 className="mt-4 text-xl font-semibold">Request Body Parameters</h3>
        <ul className="list-inside list-disc">
          <li>
            <strong>chatId</strong> (string): The identifier of the chat.
          </li>
          <li>
            <strong>messages</strong> (array): An array of messages, each of
            which is an object with two fields:
            <ul className="ml-4 list-inside list-disc">
              <li>
                <strong>content</strong> (string): The content of the message.
              </li>
              <li>
                <strong>role</strong> (string): The role of the message sender.
                Possible values: <code className="rounded  p-1">user</code> and{" "}
                <code className="rounded p-1">assistant</code> .
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Example Request</h2>
        <div className="relative rounded bg-gray-800 p-4 text-white">
          <code>
            <pre>{`curl -X POST https://api-users.fewclicks.ru/api/agents/12345/public-llm
-H "Content-Type: application/json"
-d '{
  "chatId": "testId",
  "messages": [
    {
      "content": "ok",
      "role": "user"
    },
    {
      "content": "ok",
      "role": "assistant"
    },
    {
      "content": "ok",
      "role": "user"
    }
  ]
}'`}</pre>
          </code>
          <button
            className="absolute right-2 top-2"
            onClick={() =>
              copyToClipboard(`curl -X POST https://api-users.fewclicks.ru/api/agents/12345/public-llm
-H "Content-Type: application/json"
-d '{
  "chatId": "testId",
  "messages": [
    {
      "content": "ok",
      "role": "user"
    },
    {
      "content": "ok",
      "role": "assistant"
    },
    {
      "content": "ok",
      "role": "user"
    }
  ]
}'`)
            }
          >
            <FaCopy />
          </button>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Example Response</h2>
        <p className="mb-2">
          A successful response will contain the response from the LLM agent.
          Example successful response:
        </p>
        <div className="relative rounded bg-gray-800 p-4 text-white">
          <code>
            <pre>{`{
  "response": {
    "content": "Response from the agent",
    "role": "assistant"
  }
}`}</pre>
          </code>
          <button
            className="absolute right-2 top-2"
            onClick={() =>
              copyToClipboard(`{
  "response": {
    "content": "Response from the agent",
    "role": "assistant"
  }
}`)
            }
          >
            <FaCopy />
          </button>
        </div>
        <h3 className="mt-4 text-xl font-semibold">Response Parameters</h3>
        <ul className="list-inside list-disc">
          <li>
            <strong>response</strong> (object): An object containing the
            response from the agent.
          </li>
          <li>
            <strong>content</strong> (string): The content of the response.
          </li>
          <li>
            <strong>role</strong> (string): The role of the response sender,
            always <code className="rounded p-1">assistant</code>.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Errors</h2>
        <ul className="list-inside list-disc">
          <li>
            <strong>400 Bad Request</strong>: Returned if the request body is
            incorrect or required fields are missing.
          </li>
          <li>
            <strong>404 Not Found</strong>: Returned if the agent with the
            specified <code className="rounded p-1">agentId</code> is not found.
          </li>
          <li>
            <strong>500 Internal Server Error</strong>: Returned in case of an
            internal server error.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Example Error</h2>
        <div className="relative rounded bg-gray-800 p-4 text-white">
          <code>
            <pre>{`{
  "error": "Invalid request body"
}`}</pre>
          </code>
          <button
            className="absolute right-2 top-2"
            onClick={() =>
              copyToClipboard(`{
             "error": "Invalid request body"
           }`)
            }
          >
            <FaCopy />
          </button>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-2xl font-semibold">Conclusion</h2>
        <p>
          This API allows you to send requests to an LLM agent and receive
          responses based on the provided messages. Make sure all required
          fields are included in the request body and that requests are sent
          with the correct <code className="rounded p-1">agentId</code>.
        </p>
      </section>
    </div>
  );
};

export default Documentation;
