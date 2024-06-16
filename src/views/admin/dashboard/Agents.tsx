import { IAgentResponse } from "app/types";
import { fetchData } from "app/utils/fetch/request";
import { AddButton } from "entities/AddButton";
import { CardBlock } from "features/CardBlock";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "shared/Modal";

export const Agents = () => {
  const [agents, setAgents] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<string>();

  const navigate = useNavigate();

  const getAllAgents = async () => {
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
  };

  useEffect(() => {
    getAllAgents();
  }, []);

  const deleteHandler = () => {
    const token = Cookies.get("accessToken");
    setTimeout(async () => {
      try {
        await fetchData(
          `${process.env.REACT_APP_USER_API}/agents/${deleteModalOpen}`,
          "DELETE",
          token
        );
        setDeleteModalOpen("");
      } catch (error) {
        console.error("Error on getting agents:", error);
      }
      await getAllAgents();
    });
  };

  return (
    <div className="container mx-auto">
      <AddButton
        onClick={() => {
          navigate("/agents");
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
        {agents &&
          agents.map((agent: IAgentResponse) => (
            <CardBlock
              id={agent._id}
              handleClick={() => {
                navigate(`/agents/${agent._id}`);
              }}
              handleDelete={() => {
                setDeleteModalOpen(agent._id);
              }}
            >
              <h2 className="text-lg font-semibold">{agent.name}</h2>
            </CardBlock>
          ))}
      </div>
    </div>
  );
};
