import { useState } from "react";

export function useAuth() {
  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem("logged") === "true";
  });

  const login = (email, password) => {
    if (email === "asd@asd.com" && password === "123") {
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
