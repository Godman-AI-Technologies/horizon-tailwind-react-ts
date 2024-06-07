interface IContentProps {
  children: React.ReactNode;
}

const ContentLayout: React.FC<IContentProps> = ({ children }) => {
  return <div className="mt-3 h-full min-h-[100vh]">{children}</div>;
};

export default ContentLayout;
