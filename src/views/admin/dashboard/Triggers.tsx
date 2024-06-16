import { fetchData } from "app/utils/fetch/request";
import { AddButton } from "entities/AddButton";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Triggers = () => {
  const [triggers, setTriggers] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(async () => {
      const token = Cookies.get("accessToken");
      const profileId = Cookies.get("profileId");

      try {
        const triggers = await fetchData(
          `${process.env.REACT_APP_USER_API}/profiles/${profileId}/triggers`,
          "GET",
          token
        );
        setTriggers(triggers);
      } catch (error) {
        console.error("Error on getting triggers:", error);
      }
    });
  }, []);

  const handleDelete = (id: string) => {
    alert(`Delete trigger with id: ${id}`);
  };

  const handleBlockClick = (id: string) => {
    navigate(`/triggers/${id}`);
  };

  return (
    <div className="container mx-auto">
      <AddButton
        onClick={() => {
          navigate("/triggers");
        }}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {triggers &&
          triggers.map((trigger: any) => (
            <div
              key={trigger._id}
              onClick={() => {
                handleBlockClick(trigger._id);
              }}
              className="rounded bg-white p-4 shadow dark:bg-navy-700"
            >
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
