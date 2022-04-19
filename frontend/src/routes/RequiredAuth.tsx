import { Navigate, useLocation } from "react-router-dom";
import { useUsuario } from "../hooks/user";
interface IRequiredAuth {
  children: JSX.Element;
  isPrivate?: boolean;
}

function RequireAuth({ isPrivate = false, children }: IRequiredAuth) {
  let auth = useUsuario();
  let location = useLocation();
  console.log(isPrivate);

  return isPrivate === !!auth.user ? (
    children
  ) : (
    <Navigate
      to={isPrivate ? "/" : "/dashboard"}
      state={{ from: location }}
      replace
    />
  );
}

export default RequireAuth;
