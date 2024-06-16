import { fetchData } from "app/utils/fetch/request";
import { AddButton } from "entities/AddButton";
import { CardBlock } from "features/CardBlock";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "shared/Modal";

export const Knowledge = () => {
  const [knowledge, setKnowledge] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<string>("");
  const navigate = useNavigate();

  const getAllKnowledge = async () => {
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
  };

  useEffect(() => {
    getAllKnowledge();
  }, []);

  const deleteHandler = async () => {
    const token = Cookies.get("accessToken");
    console.log(deleteModalOpen);
    try {
      await fetchData(
        `${process.env.REACT_APP_USER_API}/knowledge-vector/${deleteModalOpen}`,
        "DELETE",
        token
      );
      setDeleteModalOpen("");
    } catch (error) {
      console.error("Error on getting knowledge:", error);
    }
    await getAllKnowledge();
  };

  return (
    <div className="container mx-auto">
      <AddButton
        onClick={() => {
          navigate("/knowledge");
        }}
      />

      <Modal
        title="Delete"
        isOpen={!!deleteModalOpen}
        submitHandler={deleteHandler}
        onClose={() => {
          setDeleteModalOpen("");
        }}
        isDanger
      >
        <div>Are you sure?</div>
      </Modal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {knowledge &&
          knowledge.map((knowledgeItem: any) => (
            <CardBlock
              id={knowledgeItem._id}
              handleClick={() => {
                navigate(`/knowledge/${knowledgeItem._id}`);
              }}
              handleDelete={() => {
                setDeleteModalOpen(knowledgeItem._id);
              }}
            >
              <h2 className="text-lg font-semibold">{knowledgeItem.name}</h2>
            </CardBlock>
          ))}
      </div>
    </div>
  );
};
