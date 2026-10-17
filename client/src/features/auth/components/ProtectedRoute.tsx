import { Navigate, Outlet, useLocation } from "react-router-dom";
import AppLoader from "../../../components/ui/AppLoader";
import ErrorAlert from "../../../components/ui/ErrorAlert";
import { ROUTES } from "../../../routes/paths";
import { useAuth } from "../useAuth";

function ProtectedRoute() {
  const { user, isLoading, error, isUnauthenticated } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <AppLoader message="Checking your session..." minHeight="100dvh" />;
  }

  if (error) {
    return (
      <ErrorAlert
        message={
          error instanceof Error
            ? error.message
            : "We couldn't verify your session."
        }
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!user || isUnauthenticated) {
    return <Navigate to={ROUTES.login} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
