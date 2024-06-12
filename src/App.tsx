import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import AuthHandler from "app/utils/auth";
import SignIn from "views/auth/SignIn";
import SignUp from "views/auth/SignUp";
import { AgentLayout } from "layouts/agents";

const App = () => {
  return (
    <Routes>
      <Route
        path="auth/sign-in"
        element={
          <AuthLayout>
            <SignIn />
          </AuthLayout>
        }
      />
      <Route
        path="auth/sign-up"
        element={
          <AuthLayout>
            <SignUp />
          </AuthLayout>
        }
      />
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
      <Route
        path="agents/*"
        element={
          <AuthHandler>
            <AgentLayout />
          </AuthHandler>
        }
      />
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default App;
