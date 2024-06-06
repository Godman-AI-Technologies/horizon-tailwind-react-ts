import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ContentLayout from "shared/ContentLayout/ContentLayout";
import HorizontalLink from "shared/HorizontalLink/HorizontalLink";

const Dashboard = () => {
  const location = useLocation();

  const subroutes = [
    { path: "agents", name: "Agents" },
    { path: "notes", name: "Notes" },
    { path: "knowledge", name: "Knowledge" },
    { path: "triggers", name: "Triggers" },
  ];

  return (
    <ContentLayout>
      <div className="flex space-x-4">
        {subroutes.map((el) => (
          <div key={el.path}>
            <HorizontalLink
              path={el.path}
              isActive={location.pathname.includes(el.path)}
            >
              {el.name}
            </HorizontalLink>
          </div>
        ))}
      </div>
      <Routes>
        <Route path="agents" element={<div>agents</div>} />
        <Route path="notes" element={<div>notes</div>} />
        <Route path="knowledge" element={<div>knowledge</div>} />
        <Route path="triggers" element={<div>triggers</div>} />
        <Route path="/*" element={<Navigate to="agents" replace />} />
      </Routes>
    </ContentLayout>
  );
};

export default Dashboard;
