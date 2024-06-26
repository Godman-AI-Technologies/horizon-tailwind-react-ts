import React, { useEffect, useState } from "react";
import Dropdown from "components/dropdown";
import ChangePasswordPopup from "./change-password";
import PopoverHorizon from "components/popover";
import { FiAlignJustify } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import {} from "react-icons/io";
import Cookies from "js-cookie";
import HorizontalLink from "shared/HorizontalLink/HorizontalLink";

const subroutes = [
  { path: "dashboard/agents", name: "Agents" },
  { path: "dashboard/notes", name: "Notes" },
  { path: "dashboard/knowledge", name: "Knowledge" },
  { path: "dashboard/triggers", name: "Triggers" },
];

const Navbar = (props: {
  onOpenSidenav: () => void;
  brandText: string;
  secondary?: boolean | string;
}) => {
  const [picture, setPicture] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [name, setName] = useState();

  const location = useLocation();

  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(async () => {
      const token = Cookies.get("accessToken");
      const profileId = Cookies.get("profileId");

      try {
        const response = await fetch(
          `${process.env.REACT_APP_USER_API}/profiles/${profileId}/credentials`,
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
        setName(data?.name || "unknown");
        data.picture && setPicture(data.picture);
      } catch (err) {
        console.error(err);
      }
    });
  });

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Pages
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <Link
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            to="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>

      {location.pathname.includes("dashboard") && (
        <div className="flex space-x-4">
          {subroutes.map((el) => (
            <div key={el.path}>
              <HorizontalLink
                path={el.path}
                isActive={location.pathname.includes(el.path)}
              >
                {el.name}
              </HorizontalLink>
            </div>
          ))}
        </div>
      )}
      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Search..."
            className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
          />
        </div>
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <img className="h-10 w-10 rounded-full" src={picture} alt="" />
          }
          children={
            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="ml-4 mt-3">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    👋 Hey, {name}
                  </p>{" "}
                </div>
              </div>
              <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />
              <div className="ml-4 mt-3 flex flex-col">
                <PopoverHorizon
                  content={<ChangePasswordPopup></ChangePasswordPopup>}
                  trigger={
                    <div className="hover:cursor-pointer">Change Password</div>
                  }
                ></PopoverHorizon>{" "}
              </div>

              <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />
              <div className="my-3 ml-4 flex flex-col">
                <a
                  href=" "
                  className="text-sm font-medium text-red-500 hover:text-red-500"
                  onClick={(e) => {
                    e.preventDefault();
                    Cookies.remove("accessToken");
                    navigate("auth/log-in");
                  }}
                >
                  Log Out
                </a>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  );
};

export default Navbar;
