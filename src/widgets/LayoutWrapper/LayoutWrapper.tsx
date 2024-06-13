import { ReactNode } from "react";
import { Header } from "./components/Header";

interface ILayoutProps {
  children: ReactNode;
}

export const LayoutWrapper: React.FC<ILayoutProps> = ({ children }) => {
  document.documentElement.dir = "agents";
  return (
    <div className="fixed h-full w-full">
      <Header />
      {children}
    </div>
  );
};
