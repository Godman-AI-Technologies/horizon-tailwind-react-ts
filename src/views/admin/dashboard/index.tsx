import { Navigate, Route, Routes } from "react-router-dom";
import ContentLayout from "shared/ContentLayout/ContentLayout";
import { Agents } from "./Agents";
import { Knowledge } from "./Knowledge";
import { Notes } from "./Notes";
import { Triggers } from "./Triggers";

const Dashboard = () => {
  return (
    <ContentLayout>
      <Routes>
        <Route path="agents" element={<Agents />} />
        <Route path="notes" element={<Notes />} />
        <Route path="knowledge" element={<Knowledge />} />
        <Route path="triggers" element={<Triggers />} />
        <Route path="/*" element={<Navigate to="agents" replace />} />
      </Routes>
    </ContentLayout>
  );
};

export default Dashboard;
