import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import { ROUTES } from "./routes/paths";
import DashboardLayout from "./components/layout/DashboardLayout";
import TasksPage from "./pages/Tasks";
import ProjectPage from "./pages/ProjectPage";
import OverviewPage from "./pages/Overview";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.register} element={<RegisterPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.overview} element={<OverviewPage />} />
          <Route path={ROUTES.tasks} element={<TasksPage />} />
          <Route path={ROUTES.project} element={<ProjectPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.overview} replace />} />
    </Routes>
  );
}

export default App;
