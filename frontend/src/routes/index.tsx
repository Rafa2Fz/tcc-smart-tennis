import React from "react";

import { BrowserRouter, Routes as AppRoutes, Route } from "react-router-dom";
import Cadastro from "../pages/Cadastro";
import CadastroReserva from "../pages/CadastroReserva";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import RequireAuth from "./RequiredAuth";

const Routes: React.FC = () => {
  return (
    <AppRoutes>
      <Route
        index
        element={
          <RequireAuth>
            <Login />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RequireAuth isPrivate>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="cadastroReserva"
        element={
          <RequireAuth isPrivate>
            <CadastroReserva />
          </RequireAuth>
        }
      />

      <Route
        path="/cadastro"
        element={
          <RequireAuth>
            <Cadastro />
          </RequireAuth>
        }
      />
    </AppRoutes>
  );
};

export default Routes;
