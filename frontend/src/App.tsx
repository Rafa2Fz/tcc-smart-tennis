import React from "react";
import { ToastProvider } from "./hooks/toast";

import Login from "./pages/Login";

function App() {
  return (
    <>
      <ToastProvider>
        <Login />
      </ToastProvider>
    </>
  );
}

export default App;
