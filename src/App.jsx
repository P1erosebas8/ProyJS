import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth,";
import { Login } from "./components/Login";
import { Dashboard } from "./pages/Dashboard";
import { RutaProtejida } from "./components/RutaProtejida";

function App() {
  const { isAuth, login, logout } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginWrapper login={login} isAuth={isAuth} />}
        />
        <Route
          path="/dashboard"
          element={
            <RutaProtejida isAuth={isAuth}>
              <Dashboard logout={logout} />
            </RutaProtejida>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const LoginWrapper = ({ login, isAuth }) => {
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    const res = login(email, password);

    if (res.success) {
      navigate("/dashboard"); 
    } else {
      alert(res.message);
    }
  };
  if (isAuth) return <Navigate to="/dashboard" />;

  return <Login onLogin={handleLogin} />;
};
