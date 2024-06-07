import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import AuthHandler from "app/utils/auth";

const App = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route
        path="admin/*"
        element={
          <AuthHandler>
            <AdminLayout />
          </AuthHandler>
        }
      />
      <Route
        path="rtl/*"
        element={
          <AuthHandler>
            <RtlLayout />
          </AuthHandler>
        }
      />
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default App;
