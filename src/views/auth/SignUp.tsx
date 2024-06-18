import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Checkbox } from "shared/Checkbox";
import { Input } from "shared/Input";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState(""); // State for error message
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State for button disabled

  const navigate = useNavigate();

  // Effect to check if all fields are filled
  useEffect(() => {
    if (username && email && password && confirmPassword && acceptTerms) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [username, email, password, confirmPassword, acceptTerms]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!acceptTerms) {
      setError("You must accept the Terms and Conditions");
      return;
    }
    try {
      const registerResponse = await fetch(
        `${process.env.REACT_APP_USER_API}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            isVerified: false,
          }),
        }
      );
      if (!registerResponse.ok) {
        throw new Error("Failed to sign up");
      }
      const register = await registerResponse.json();

      const payloadResponse = await fetch(
        `${process.env.REACT_APP_USER_API}/auth/payload`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${register.accessToken}`,
          },
        }
      );
      if (!payloadResponse.ok) {
        throw new Error("Failed to fetch user data");
      }
      const payload = await payloadResponse.json();

      Cookies.set("accessToken", register.accessToken, {
        expires: 1,
      });
      Cookies.set("profileId", payload.mongoUserId, {
        expires: 1,
      });
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      console.error("Error signing up:", error);
    }
  };

  const handleGoogleSignUp = () => {
    console.log("Sign Up with Google");
  };

  return (
    <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign up section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign Up
        </h4>
        <p className="mb-6 ml-1 text-base text-gray-600">
          Enter your email and password to sign up!
        </p>
        {error && (
          <p className="mb-4 text-sm font-medium text-red-500">{error}</p>
        )}
        <form onSubmit={handleSignUp}>
          {/* Username */}
          <Input
            variant="auth"
            extra="mb-3"
            label="Username*"
            placeholder="Username"
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* Email */}
          <Input
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@simmmple.com"
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <Input
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Confirm Password */}
          <Input
            variant="auth"
            extra="mb-3"
            label="Confirm Password*"
            placeholder="Re-enter your password"
            id="confirm-password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Checkbox */}
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox
                checked={acceptTerms}
                onChange={() => setAcceptTerms(!acceptTerms)}
              />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                I accept the Terms and Conditions
              </p>
            </div>
          </div>
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 ${
              isButtonDisabled
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-brand-600 active:bg-brand-700"
            } dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200`}
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4">
          <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
            Already have an account?
          </span>
          <a
            href="/auth/sign-in"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
