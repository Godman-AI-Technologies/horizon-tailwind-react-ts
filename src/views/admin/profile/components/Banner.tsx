import avatar from "assets/img/avatars/avatar11.png";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";
import { useEffect, useState } from "react";

const Banner = () => {
  const [name, setName] = useState<string>("unknown");
  const [email, setEmail] = useState<string>("no email");
  const [agentCount, setAgentCount] = useState<string | number>("--");
  const [chatCount, setChatCount] = useState<string | number>("--");
  const [messageCount, setMessageCount] = useState<string | number>("--");

  useEffect(() => {
    setTimeout(() => {
      setName("Name Name");
      setEmail("test@email.com");
      setAgentCount(3);
      setChatCount(43);
      setMessageCount(123);
    }, 500);
  });

  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img className="h-full w-full rounded-full" src={avatar} alt="" />
        </div>
      </div>

      {/* Name and email */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {name}
        </h4>
        <p className="text-base font-normal text-gray-600">{email}</p>
      </div>

      {/* Profile info */}
      <div className="mb-3 mt-6 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {agentCount}
          </p>
          <p className="text-sm font-normal text-gray-600">agetns</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {chatCount}
          </p>
          <p className="text-sm font-normal text-gray-600">chats</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {messageCount}
          </p>
          <p className="text-sm font-normal text-gray-600">messages</p>
        </div>
      </div>
    </Card>
  );
};

export default Banner;
