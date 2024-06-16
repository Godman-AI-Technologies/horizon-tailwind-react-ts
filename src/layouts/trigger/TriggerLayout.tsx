import { ITriggerResponse } from "app/types";
import { fetchData } from "app/utils/fetch/request";
import { generateUniqueText } from "app/utils/random/agent";
import FullScreenLoader from "entities/FullScreenLoader/FullScreenLoader";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ResponsiveLayout } from "shared/ResponsiveLayout";
import { SwitchLayout } from "shared/SwitchLayout";
import { LayoutWrapper } from "widgets/LayoutWrapper";

interface ITriggerLayoutProps {
  type: "create" | "update";
}

export const TriggerLayout: React.FC<ITriggerLayoutProps> = ({ type }) => {
  document.documentElement.dir = "agents";
  const { id } = useParams();

  const navigate = useNavigate();
  const uniqueText = generateUniqueText();

  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState<ITriggerResponse>({
    name: uniqueText,
    type: "prompt",
    condition: "",
  });
  const [temporaryName, setTemporaryName] = useState(uniqueText);

  useEffect(() => {
    if (type === "create" || !id) return;
    setTimeout(async () => {
      try {
        const token = Cookies.get("accessToken");
        const url = `${process.env.REACT_APP_USER_API}/triggers/${id}`;
        const trigger = await fetchData<ITriggerResponse>(url, "GET", token);
        setTrigger({
          name: trigger.name,
          type: trigger.type,
          condition: trigger.condition,
        });
        setTemporaryName(trigger.name);
        setLoading(false);
      } catch (error) {
        console.error("Error on fetching trigger:", error);
      }
    });
  }, [id, type]);

  const updateSubmitHandler = async () => {
    try {
      const token = Cookies.get("accessToken");
      const url = process.env.REACT_APP_USER_API + `/triggers/${id}`;
      const updatedTrigger = await fetchData<ITriggerResponse>(
        url,
        "PUT",
        token,
        trigger
      );
      setTemporaryName(updatedTrigger.name);
    } catch (error) {
      console.error("Error on fetching trigger:", error);
    }
  };

  const createSubmitHandler = async () => {
    try {
      const token = Cookies.get("accessToken");
      const profileId = Cookies.get("profileId");
      const url = process.env.REACT_APP_USER_API + `/triggers/${profileId}`;
      const createdTrigger = await fetchData<ITriggerResponse>(
        url,
        "POST",
        token,
        trigger
      );
      navigate(createdTrigger._id);
    } catch (error) {
      console.error("Error on creating knowledge:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTrigger((prev) => ({ ...prev, condition: e.target.value }));
  };

  return (
    <>
      {loading && type === "update" ? (
        <FullScreenLoader />
      ) : (
        <LayoutWrapper
          name={trigger.name}
          isUpdate={type === "update"}
          backwardPath="/admin/dashboard/triggers"
          modalSubmitHandler={() => {
            setTrigger({
              ...trigger,
              name: temporaryName,
            });
          }}
          modalCloseHandler={() => {
            setTemporaryName(trigger.name);
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
                    Trigger type: {trigger.type}
                  </header>
                </div>
              ),
            }}
            centerSide={{
              title: "center",
              component: (
                <textarea
                  onChange={handleChange}
                  className="bg-transparent relative box-border h-full w-full cursor-text select-text resize-none whitespace-pre-wrap break-words border-0 p-[5px_12px] align-bottom font-sans text-sm leading-[22px] shadow-none outline-none"
                  placeholder="Type something..."
                >
                  {trigger?.condition || ""}
                </textarea>
              ),
            }}
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
