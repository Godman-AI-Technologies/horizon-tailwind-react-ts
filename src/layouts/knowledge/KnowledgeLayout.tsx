import { IKnowledge } from "app/types/knowledge";
import { fetchData } from "app/utils/fetch/request";
import { generateUniqueText } from "app/utils/random/agent";
import FullScreenLoader from "entities/FullScreenLoader/FullScreenLoader";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ResponsiveLayout } from "shared/ResponsiveLayout";
import { SwitchLayout } from "shared/SwitchLayout";
import { LayoutWrapper } from "widgets/LayoutWrapper";

interface IKnowledgeLayoutProps {
  type: "create" | "update";
}

export const KnowledgeLayout: React.FC<IKnowledgeLayoutProps> = ({ type }) => {
  document.documentElement.dir = "knowledge";
  const { id } = useParams();

  const navigate = useNavigate();
  const uniqueText = generateUniqueText();

  const [loading, setLoading] = useState(true);
  const [knowledge, setKnowledge] = useState<IKnowledge>({
    name: uniqueText,
    data: "test",
  });
  const [temporaryName, setTemporaryName] = useState(uniqueText);

  useEffect(() => {
    if (type === "create" || !id) return;
    setTimeout(async () => {
      try {
        const token = Cookies.get("accessToken");
        const url = `${process.env.REACT_APP_USER_API}/knowledge-vector/${id}`;
        const knowledge = await fetchData<IKnowledge>(url, "GET", token);
        setKnowledge({
          name: knowledge.name,
          data: knowledge.data,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error on fetching knowledge:", error);
      }
    });
  }, [id, type]);

  const updateSubmitHandler = async () => {
    try {
      const token = Cookies.get("accessToken");
      const url = process.env.REACT_APP_USER_API + `/knowledge-vector/${id}`;
      const updatedKnowledge = await fetchData<IKnowledge>(
        url,
        "PUT",
        token,
        knowledge
      );
      setTemporaryName(updatedKnowledge.name);
    } catch (error) {
      console.error("Error on fetching agent:", error);
    }
  };

  const createSubmitHandler = async () => {
    try {
      const token = Cookies.get("accessToken");
      const profileId = Cookies.get("profileId");
      const url =
        process.env.REACT_APP_USER_API + `/knowledge-vector/${profileId}`;
      const createdKnowledge = await fetchData<IKnowledge>(
        url,
        "POST",
        token,
        knowledge
      );
      navigate(createdKnowledge._id);
    } catch (error) {
      console.error("Error on creating knowledge:", error);
    }
  };

  return (
    <>
      {loading && type === "update" ? (
        <FullScreenLoader />
      ) : (
        <LayoutWrapper
          name={knowledge.name}
          isUpdate={type === "update"}
          backwardPath="/admin/dashboard/knowledge"
          modalSubmitHandler={() => {
            setKnowledge({
              ...knowledge,
              name: temporaryName,
            });
          }}
          modalCloseHandler={() => {
            setTemporaryName(knowledge.name);
          }}
          submitHandler={
            type === "update" ? updateSubmitHandler : createSubmitHandler
          }
          modalContent={
            <div className="flex flex-col">
              <label className="mb-2 text-lg font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setTemporaryName(e.target.value);
                }}
                value={temporaryName}
                className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          }
        >
          <ResponsiveLayout
            leftSide={{
              title: "Left",
              component: (
                <div>
                  <header className="h-8 text-center text-xl font-bold">
                    Props Settings
                  </header>
                  <SwitchLayout
                    sides={[
                      { title: "Parsing", component: <div>Parsing</div> },
                      { title: "File", component: <div>File</div> },
                    ]}
                  />
                </div>
              ),
            }}
            centerSide={{ title: "center", component: <div>center</div> }}
            rightSide={{
              title: "right",
              component: <div className="h-full bg-green-300">Info</div>,
            }}
          />
        </LayoutWrapper>
      )}
    </>
  );
};
