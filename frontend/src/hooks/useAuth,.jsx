import { useState } from "react";

export function useAuth() {
  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem("logged") === "true";
  });

  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setIsAuth(true);
        localStorage.setItem("logged", "true");
        return { success: true };
      }

      return { success: false, message: data.error };

    } catch (error) {
      return { success: false, message: "Error en el servidor" };
    }
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("logged");
  };

  return { isAuth, login, logout };
}
