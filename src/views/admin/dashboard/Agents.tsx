import { IAgentResponse } from "app/types";
import { fetchData } from "app/utils/fetch/request";
import { AddButton } from "entities/AddButton";
import { CardBlock } from "features/CardBlock";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Agents = () => {
  const [agents, setAgents] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(async () => {
      const token = Cookies.get("accessToken");
      const profileId = Cookies.get("profileId");

      try {
        const agents = await fetchData(
          `${process.env.REACT_APP_USER_API}/profiles/${profileId}/agents`,
          "GET",
          token
        );
        setAgents(agents);
      } catch (error) {
        console.error("Error on getting agents:", error);
      }
    });
  }, []);

  return (
    <div className="container mx-auto">
      <AddButton
        onClick={() => {
          navigate("/agents");
        }}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agents &&
          agents.map((agent: IAgentResponse) => (
            <CardBlock
              id={agent._id}
              handleClick={() => {
                navigate(`/agents/${agent._id}`);
              }}
              handleDelete={() => {
                alert(agent._id);
              }}
            >
              <h2 className="text-lg font-semibold">{agent.name}</h2>
            </CardBlock>
          ))}
      </div>
    </div>
  );
};
