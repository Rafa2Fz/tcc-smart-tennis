import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./hooks/toast";
import { UserProvider } from "./hooks/user";
import Routes from "./routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastProvider>
          <UserProvider>
            <Routes />
          </UserProvider>
        </ToastProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
