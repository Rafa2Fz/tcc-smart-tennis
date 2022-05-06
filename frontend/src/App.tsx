import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./hooks/toast";
import { UserProvider } from "./hooks/user";
import Routes from "./routes";
import verde from "./theme/verde";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={verde}>
          <ToastProvider>
            <UserProvider>
              <Routes />
            </UserProvider>
          </ToastProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
