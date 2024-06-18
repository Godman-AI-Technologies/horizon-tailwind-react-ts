import { Routes, Route, Navigate } from "react-router-dom";

import AuthHandler from "app/utils/auth";
import SignIn from "views/auth/SignIn";
import SignUp from "views/auth/SignUp";
import { AuthLayout } from "layouts/AuthLayout";
import { AdminLayout } from "layouts/AdminLayout";
import { TriggerLayout } from "layouts/TriggerLayout";
import { KnowledgeLayout } from "layouts/KnowledgeLayout";
import { AgentLayout } from "layouts/AgentLayout";
import { RtlLayout } from "layouts/RtlLayout";

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
        path="agents/"
        element={
          <AuthHandler>
            <AgentLayout type="create" />
          </AuthHandler>
        }
      />
      <Route
        path="agents/:id"
        element={
          <AuthHandler>
            <AgentLayout type="update" />
          </AuthHandler>
        }
      />
      <Route
        path="knowledge/"
        element={
          <AuthHandler>
            <KnowledgeLayout type="create" />
          </AuthHandler>
        }
      />
      <Route
        path="knowledge/:id"
        element={
          <AuthHandler>
            <KnowledgeLayout type="update" />
          </AuthHandler>
        }
      />
      <Route
        path="triggers/"
        element={
          <AuthHandler>
            <TriggerLayout type="create" />
          </AuthHandler>
        }
      />
      <Route
        path="triggers/:id"
        element={
          <AuthHandler>
            <TriggerLayout type="update" />
          </AuthHandler>
        }
      />
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default App;
