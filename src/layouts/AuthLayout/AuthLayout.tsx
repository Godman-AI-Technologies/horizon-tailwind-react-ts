import authImg from "./assets/auth.jpg";
import { ReactNode } from "react";
import { FooterAuth } from "widgets/Footer";
import { FixedButton } from "features/FixedButton";

export default function Auth(props: { children: ReactNode }) {
  document.documentElement.dir = "ltr";
  const { children } = props;

  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <FixedButton />
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pl-12 md:pr-0 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                {children}
                <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
                  <div
                    className="absolute flex h-full w-full items-end justify-center bg-cover bg-center"
                    style={{ backgroundImage: `url(${authImg})` }}
                  />
                </div>
              </div>
              <FooterAuth />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
