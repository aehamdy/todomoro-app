import { useLocation } from "react-router-dom";

function useScreenshotMode(): boolean {
  const { search } = useLocation();

  return new URLSearchParams(search).get("screenshot") === "true";
}

export default useScreenshotMode;
