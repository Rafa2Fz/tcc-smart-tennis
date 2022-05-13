import { AxiosError } from "axios";
import { createContext, useCallback, useContext, useState } from "react";
import api from "../config/connection";
import { useToast } from "../hooks/toast";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface IUserContext {
  logout(): Promise<void>;
  user: IUserPayload;
  login(email: string, password: string): Promise<void>;
}

interface IUserPayload {
  id: string;
  email: string;
  nome: string;
  tipoUsuario: {
    id: number;
    name: string;
  };
  credito: number;
}

interface AuthState {
  user: IUserPayload;
  token: string;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider: React.FC = ({ children }) => {
  let navigate = useNavigate();
  const { addToast } = useToast();

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@SmartTennis:token");
    const user = localStorage.getItem("@SmartTennis:user");

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return { user: JSON.parse(user), token };
    }

    return {} as AuthState;
  });

  const login = useCallback(
    async (email, password) => {
      try {
        const resposta = await api.post("/auth", { email, password });
        const token = resposta.data;
        const payload = jwt_decode<IUserPayload>(token);

        localStorage.setItem("@SmartTennis:token", token);
        localStorage.setItem("@SmartTennis:user", JSON.stringify(payload));

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setData({ token, user: payload });

        navigate("/dashboard", { replace: true });
      } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
          let message = err.response.data;
          addToast({ text: message, type: "error" });
        } else {
          let message = err.message;
          addToast({ text: message, type: "error" });
        }
      }
    },
    [addToast]
  );

  const logout = useCallback(async () => {
    localStorage.removeItem("@SmartTennis:token");
    localStorage.removeItem("@SmartTennis:user");

    setData({} as AuthState);
  }, []);

  return (
    <UserContext.Provider value={{ login, logout, user: data.user }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUsuario() {
  const usuarioContext = useContext(UserContext);

  return usuarioContext;
}
