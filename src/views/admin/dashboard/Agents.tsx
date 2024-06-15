import { IAgentResponse } from "app/types";
import { fetchData } from "app/utils/fetch/request";
import { AddButton } from "entities/AddButton";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Agents = () => {
  const [agents, setAgents] = useState(null);
  const [showMenu, setShowMenu] = useState(null);
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

  const handleDelete = (id: string) => {
    alert(`Delete agent with id: ${id}`);
  };

  const handleBlockClick = (id: string) => {
    navigate(`/agents/${id}`);
  };

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
            <div
              key={agent._id}
              onClick={() => handleBlockClick(agent._id)}
              className="relative cursor-pointer rounded bg-white p-4 shadow hover:bg-gray-50 dark:bg-navy-700 hover:dark:bg-navy-800"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{agent.name}</h2>
                <div className="relative">
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(showMenu === agent._id ? null : agent._id);
                    }}
                  >
                    <FaEllipsisV />
                  </button>
                  {showMenu === agent._id && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg"
                      onMouseLeave={() => setShowMenu(null)}
                    >
                      <button
                        className="block w-full px-4 py-2 text-left text-red-500 hover:bg-red-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(agent._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
