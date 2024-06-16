import { fetchData } from "app/utils/fetch/request";
import { AddButton } from "entities/AddButton";
import { CardBlock } from "features/CardBlock";
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
            <CardBlock
              id={trigger._id}
              handleClick={() => {
                navigate(`/triggers/${trigger._id}`);
              }}
              handleDelete={() => {
                alert(trigger._id);
              }}
            >
              <h2 className="text-lg font-semibold">{trigger.name}</h2>
            </CardBlock>
          ))}
      </div>
    </div>
  );
};
