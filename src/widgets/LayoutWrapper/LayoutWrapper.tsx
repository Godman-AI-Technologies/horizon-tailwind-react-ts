import { ReactNode } from "react";
import { Header } from "./components/Header";

interface ILayoutProps {
  name: string;
  children: ReactNode;
}

export const LayoutWrapper: React.FC<ILayoutProps> = ({ name, children }) => {
  document.documentElement.dir = "agents";
  return (
    <div className="fixed h-full w-full">
      <Header name={name} />
      {children}
    </div>
  );
};
