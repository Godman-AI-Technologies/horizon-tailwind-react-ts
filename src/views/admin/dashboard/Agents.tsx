import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export const Agents = () => {
  const [agents, setAgents] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      const token = Cookies.get("accessToken");
      const profileId = Cookies.get("profileId");

      try {
        const response = await fetch(
          `${process.env.REACT_APP_USER_API}/profiles/${profileId}/agents`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to get agents");
        }

        const data = await response.json();
        console.log(data);
        setAgents(data);
      } catch (error) {
        console.error("Error on getting agents:", error);
      }
    };

    fetchAgents();
  }, []);

  const handleDelete = (id: string) => {
    alert(`Delete agent with id: ${id}`);
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agents &&
          agents.map((agent: any) => (
            <div key={agent._id} className="rounded bg-white p-4 shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{agent.name}</h2>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(agent._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
