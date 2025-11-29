import { Navigate } from "react-router-dom";

export const RutaProtejida = ({ isAuth, children }) => {
  if (!isAuth) return <Navigate to="/" />;
  return children;
};
