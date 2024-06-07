# Documentation for Open API to Get Response from LLM Agent

## Description

This API provides the ability to send a request to an LLM agent and receive a response. The request is made to{" "} `https://api-users.fewclicks.ru/api/agents/:agentId/public-llm` .

## URL

`https://api-users.fewclicks.ru/api/agents/:agentId/public-llm`

**:agentId** — the identifier of the agent to which the request is directed.

## Method

`POST`

## Headers

`Content-Type: application/json`

## Request Body

The request body should contain the chat ID and an array of messages. Example request body:

```json
{
  "chatId": "testId",
  "messages": [
    { "content": "ok", "role": "user" },
    { "content": "ok", "role": "assistant" },
    { "content": "ok", "role": "user" }
  ]
}
```

### Request Body Parameters

- **chatId** (string): The identifier of the chat.
- **messages** (array): An array of messages, each of which is an object with two fields:
- **content** (string): The content of the message.
- **role** (string): The role of the message sender. Possible values:{" "} `user` (user) and{" "} `assistant`{" "} (assistant).

## Example Request

```bash
curl -X POST https://api-users.fewclicks.ru/api/agents/12345/public-llm
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
}'
```

## Example Response

A successful response will contain the response from the LLM agent. Example successful response:

```json
{ "response": { "content": "Response from the agent", "role": "assistant" } }
```

### Response Parameters

- **response** (object): An object containing the response from the agent.
- **content** (string): The content of the response.
- **role** (string): The role of the response sender, always{" "} `assistant`.

## Errors

- **400 Bad Request**: Returned if the request body is incorrect or required fields are missing.
- **404 Not Found**: Returned if the agent with the specified `agentId`{" "} is not found.
- **500 Internal Server Error**: Returned in case of an internal server error.

## Example Error

```json
{ "error": "Invalid request body" }
```

## Conclusion

This API allows you to send requests to an LLM agent and receive responses based on the provided messages. Make sure all required fields are included in the request body and that requests are sent with the correct `agentId`.
