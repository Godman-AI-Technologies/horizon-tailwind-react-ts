import { ReactNode } from "react";

interface IContentProps {}

const ContentLayout: React.FC<any> = (props: { children: ReactNode }) => {
  return <div className="mt-3">{props.children}</div>;
};

export default ContentLayout;
