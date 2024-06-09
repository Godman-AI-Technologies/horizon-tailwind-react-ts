import Cookies from "js-cookie";
import { useEffect } from "react";

export const Triggers = () => {
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
          throw new Error("Failed to get agents");
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error on getting agents:", error);
      }
    };

    fetchTriggers();
  });
  return <div>Triggers</div>;
};
