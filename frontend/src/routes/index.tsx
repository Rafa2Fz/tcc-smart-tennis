import React from "react";

import { BrowserRouter, Routes as AppRoutes, Route } from "react-router-dom";
import AdicionaCreditoForm from "../pages/AdicionaCreditoForm";
import AgendarFolga from "../pages/AgendarFolga";
import Cadastro from "../pages/Cadastro";
import CadastroReserva from "../pages/CadastroReserva";
import ComprarCredito from "../pages/ComprarCredito";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Perfil from "../pages/Perfil";
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
      <Route
        path="/perfil"
        element={
          <RequireAuth isPrivate>
            <Perfil />
          </RequireAuth>
        }
      />
       <Route
        path="/adicionaCredito"
        element={
          <RequireAuth isPrivate>
            <AdicionaCreditoForm />
          </RequireAuth>
        }
      />
      <Route
        path="/adicionaFolga"
        element={
          <RequireAuth isPrivate>
            <AgendarFolga />
          </RequireAuth>
        }
      />
      <Route
        path="/comprarCredito"
        element={
          <RequireAuth isPrivate>
            <ComprarCredito />
          </RequireAuth>
        }
      />
    </AppRoutes>
  );
};

export default Routes;
