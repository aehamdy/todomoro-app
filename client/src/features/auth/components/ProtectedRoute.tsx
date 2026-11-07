import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AppLoader from "../../../components/ui/AppLoader";
import ErrorAlert from "../../../components/ui/ErrorAlert";
import { ROUTES } from "../../../routes/paths";
import { useAuth } from "../hooks/useAuth";
import { useAppTheme } from "../../../theme/AppThemeProvider";

function ProtectedRoute() {
  const { user, isLoading, error, isUnauthenticated } = useAuth();
  const { setThemePreference } = useAppTheme();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      setThemePreference(user.preferences.theme);
    } else if (isUnauthenticated) {
      setThemePreference("system");
    }
  }, [user, isUnauthenticated, setThemePreference]);

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
