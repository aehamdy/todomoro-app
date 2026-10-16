import { Alert, Button } from "@mui/material";

type ErrorAlertProps = {
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
};

function ErrorAlert({
  message = "Something went wrong. Please try again.",
  onRetry,
  retryLabel = "Retry",
}: ErrorAlertProps) {
  return (
    <Alert
      severity="error"
      action={
        onRetry ? (
          <Button color="inherit" size="small" onClick={onRetry}>
            {retryLabel}
          </Button>
        ) : undefined
      }
    >
      {message}
    </Alert>
  );
}

export default ErrorAlert;
