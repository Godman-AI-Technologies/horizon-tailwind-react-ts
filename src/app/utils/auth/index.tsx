import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthHandler = (props: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = Cookies.get("accessToken"); // Assuming the token is stored under the name 'token'

      if (!token) {
        navigate("/auth/sign-in"); // Redirect to login if no token found
        return;
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_USER_API}/auth/payload`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to verify token");
        }

        const data = await response.json();
        Cookies.set("profileId", data.mongoUserId);
      } catch (error) {
        console.error("Error verifying token:", error);
        navigate("/auth/sign-in"); // Redirect to login if token verification fails
      }
    };

    verifyToken();
  }, [navigate]);

  return <>{props.children}</>;
};

export default AuthHandler;
