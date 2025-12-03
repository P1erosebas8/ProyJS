import { useState } from "react";

export function useAuth() {
  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem("logged") === "true";
  });
  
  const [userRole, setUserRole] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      return user.rol || "estudiante";
    }
    return "estudiante";
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
        setUserRole(data.user.rol);
        localStorage.setItem("logged", "true");
        localStorage.setItem("user", JSON.stringify(data.user));
        return { success: true, role: data.user.rol };
      }

      return { success: false, message: data.error };

   
    } catch (error) {
      return { success: false, message: "Error en el servidor" };
    }
  };

  const logout = () => {
    setIsAuth(false);
    setUserRole("estudiante");
    localStorage.removeItem("logged");
    localStorage.removeItem("user");
  };

  return { isAuth, userRole, login, logout };
}