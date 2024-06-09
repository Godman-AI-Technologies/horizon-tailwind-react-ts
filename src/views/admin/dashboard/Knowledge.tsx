import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export const Knowledge = () => {
  const [knowledge, setKnowledge] = useState(null);

  useEffect(() => {
    const fetchKnowledge = async () => {
      const token = Cookies.get("accessToken");
      const profileId = Cookies.get("profileId");

      try {
        const response = await fetch(
          `${process.env.REACT_APP_USER_API}/profiles/${profileId}/knowledge-vector`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to get knowledge");
        }

        const data = await response.json();
        console.log(data);
        setKnowledge(data);
      } catch (error) {
        console.error("Error on getting knowledge:", error);
      }
    };

    fetchKnowledge();
  }, []);

  const handleDelete = (id: string) => {
    alert(`Delete knowledgeItem with id: ${id}`);
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {knowledge &&
          knowledge.map((knowledgeItem: any) => (
            <div
              key={knowledgeItem._id}
              className="rounded bg-white p-4 shadow dark:bg-navy-700"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{knowledgeItem.name}</h2>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(knowledgeItem._id)}
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
