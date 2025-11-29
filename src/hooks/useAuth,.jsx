import { useState } from "react";

export function useAuth() {
  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem("logged") === "true";
  });

  const login = (email, password) => {
    if (email === "u123456@wilpre.edu.pe" && password === "admin123") {
      setIsAuth(true);
      localStorage.setItem("logged", "true");
      return { success: true };
    }
    return { success: false, message: "Credenciales incorrectas" };
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("logged");
  };

  return { isAuth, login, logout };
}
