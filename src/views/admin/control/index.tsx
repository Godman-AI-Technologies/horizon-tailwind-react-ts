import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ContentLayout from "shared/ContentLayout/ContentLayout";
import HorizontalLink from "shared/HorizontalLink/HorizontalLink";

const Control = () => {
  const location = useLocation();

  return (
    <ContentLayout>
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

export default Control;
