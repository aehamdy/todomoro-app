import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import App from "./App";
import queryClient from "./lib/queryClient";
import "./index.css";
import { AppThemeProvider } from "./theme/AppThemeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <AppThemeProvider>
            <App />
          </AppThemeProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </QueryClientProvider>
  </StrictMode>,
);
