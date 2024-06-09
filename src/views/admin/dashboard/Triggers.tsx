import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export const Triggers = () => {
  const [triggers, setTriggers] = useState(null);
  useEffect(() => {
    const fetchTriggers = async () => {
      const token = Cookies.get("accessToken");
      const profileId = Cookies.get("profileId");

      try {
        const response = await fetch(
          `${process.env.REACT_APP_USER_API}/profiles/${profileId}/triggers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to get triggers");
        }

        const data = await response.json();
        console.log(data);
        setTriggers(data);
      } catch (error) {
        console.error("Error on getting triggers:", error);
      }
    };

    fetchTriggers();
  }, []);

  const handleDelete = (id: string) => {
    alert(`Delete trigger with id: ${id}`);
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {triggers &&
          triggers.map((trigger: any) => (
            <div key={trigger._id} className="rounded bg-white p-4 shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{trigger.name}</h2>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(trigger._id)}
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
