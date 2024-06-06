import { Link } from "react-router-dom";

interface ILinkProps {
  path: string;
  isActive: boolean;
  children: string;
}

const HorizontalLink: React.FC<ILinkProps> = ({ path, isActive, children }) => {
  return (
    <Link to={path}>
      <div className="relative my-[3px] flex px-4 hover:cursor-pointer">
        <p
          className={`leading-1 flex ${
            isActive
              ? "font-bold text-navy-700 dark:text-white"
              : "font-medium text-gray-600"
          }`}
        >
          {children}
        </p>
      </div>
    </Link>
  );
};

export default HorizontalLink;
