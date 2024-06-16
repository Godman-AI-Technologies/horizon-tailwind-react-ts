import { ReactNode } from "react";

const ContentLayout: React.FC<any> = (props: {
  children: ReactNode;
  className: string;
}) => {
  return <div className={"mt-3 " + props.className}>{props.children}</div>;
};

export default ContentLayout;
