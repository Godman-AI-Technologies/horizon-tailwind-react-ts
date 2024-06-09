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
          receive a response. The request is made to{" "}
          <code className="rounded bg-gray-200 p-1">
            https://api-users.fewclicks.ru/api/agents/:agentId/public-llm
          </code>
          .
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">URL</h2>
        <p className="rounded bg-gray-200 p-2">
          https://api-users.fewclicks.ru/api/agents/:agentId/public-llm
        </p>
        <p className="mt-2">
          <strong>:agentId</strong> — the identifier of the agent to which the
          request is directed.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Method</h2>
        <p className="rounded bg-gray-200 p-2">POST</p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Headers</h2>
        <p className="rounded bg-gray-200 p-2">
          Content-Type: application/json
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Request Body</h2>
        <p>
          The request body should contain the chat ID and an array of messages.
          Example request body:
        </p>
        <pre className="rounded bg-gray-200 p-4">
          {`{
  "chatId": "testId",
  "messages": [
    { "content": "ok", "role": "user" },
    { "content": "ok", "role": "assistant" },
    { "content": "ok", "role": "user" }
  ]
}`}
        </pre>
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
                Possible values:{" "}
                <code className="rounded bg-gray-200 p-1">user</code> (user) and{" "}
                <code className="rounded bg-gray-200 p-1">assistant</code>{" "}
                (assistant).
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Example Request</h2>
        <pre className="rounded bg-gray-200 p-4">
          {`curl -X POST https://api-users.fewclicks.ru/api/agents/12345/public-llm
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
}'`}
        </pre>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Example Response</h2>
        <p>
          A successful response will contain the response from the LLM agent.
          Example successful response:
        </p>
        <pre className="rounded bg-gray-200 p-4">
          {`{
  "response": {
    "content": "Response from the agent",
    "role": "assistant"
  }
}`}
        </pre>
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
            always <code className="rounded bg-gray-200 p-1">assistant</code>.
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
            specified <code className="rounded bg-gray-200 p-1">agentId</code>{" "}
            is not found.
          </li>
          <li>
            <strong>500 Internal Server Error</strong>: Returned in case of an
            internal server error.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold">Example Error</h2>
        <pre className="rounded bg-gray-200 p-4">
          {`{
  "error": "Invalid request body"
}`}
        </pre>
      </section>

      <section>
        <h2 className="mb-2 text-2xl font-semibold">Conclusion</h2>
        <p>
          This API allows you to send requests to an LLM agent and receive
          responses based on the provided messages. Make sure all required
          fields are included in the request body and that requests are sent
          with the correct{" "}
          <code className="rounded bg-gray-200 p-1">agentId</code>.
        </p>
      </section>
    </div>
  );
};

export default Documentation;
