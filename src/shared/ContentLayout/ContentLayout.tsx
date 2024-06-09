interface IContentProps {
  children: React.ReactNode;
}

const ContentLayout: React.FC<IContentProps> = ({ children }) => {
  return <div className="mt-3">{children}</div>;
};

export default ContentLayout;
