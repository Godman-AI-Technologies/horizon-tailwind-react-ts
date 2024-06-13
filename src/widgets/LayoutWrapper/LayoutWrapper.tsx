import { ReactNode } from "react";

interface ILayoutProps {
  headerTitle: string;
  children: ReactNode;
}

export const LayoutWrapper: React.FC<ILayoutProps> = ({
  children,
  headerTitle,
}) => {
  document.documentElement.dir = "agents";
  return (
    <div className="fixed h-full w-full">
      <header>{headerTitle}</header>
      {children}
    </div>
  );
};
