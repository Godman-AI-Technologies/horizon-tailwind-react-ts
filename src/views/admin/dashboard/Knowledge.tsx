import { fetchData } from "app/utils/fetch/request";
import { AddButton } from "entities/AddButton";
import { CardBlock } from "features/CardBlock";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Knowledge = () => {
  const [knowledge, setKnowledge] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(async () => {
      const token = Cookies.get("accessToken");
      const profileId = Cookies.get("profileId");

      try {
        const knowledge = await fetchData(
          `${process.env.REACT_APP_USER_API}/profiles/${profileId}/knowledge-vector`,
          "GET",
          token
        );

        setKnowledge(knowledge);
      } catch (error) {
        console.error("Error on getting knowledge:", error);
      }
    });
  }, []);

  return (
    <div className="container mx-auto">
      <AddButton
        onClick={() => {
          navigate("/knowledge");
        }}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {knowledge &&
          knowledge.map((knowledgeItem: any) => (
            <CardBlock
              id={knowledgeItem._id}
              handleClick={() => {
                navigate(`/knowledge/${knowledgeItem._id}`);
              }}
              handleDelete={() => {
                alert(knowledgeItem._id);
              }}
            >
              <h2 className="text-lg font-semibold">{knowledgeItem.name}</h2>
            </CardBlock>
          ))}
      </div>
    </div>
  );
};
