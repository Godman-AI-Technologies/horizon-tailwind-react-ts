import { ReactNode } from "react";
import { Header } from "./components/Header";

interface ILayoutProps {
  name: string;
  backwardPath?: string;
  children: ReactNode;
}

export const LayoutWrapper: React.FC<ILayoutProps> = ({
  name,
  backwardPath,
  children,
}) => {
  document.documentElement.dir = "agents";
  return (
    <div className="fixed h-full w-full">
      <Header backwardPath={backwardPath} name={name} />
      {children}
    </div>
  );
};
