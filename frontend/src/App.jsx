import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth,";
import { Login } from "./components/Login";
import { Dashboard } from "./pages/Dashboard";
import { Courses } from "./pages/Courses";
import { CourseDetail } from "./pages/CourseDetail";
import { RutaProtejida } from "./components/RutaProtejida";
import { MainLayout } from "./layouts/MainLayout";

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
              <MainLayout logout={logout}>
                <Dashboard />
              </MainLayout>
            </RutaProtejida>
          }
        />
        <Route
          path="/cursos"
          element={
            <RutaProtejida isAuth={isAuth}>
              <MainLayout logout={logout}>
                <Courses />
              </MainLayout>
            </RutaProtejida>
          }
        />
        <Route
          path="/cursos/:id"
          element={
            <RutaProtejida isAuth={isAuth}>
              <MainLayout logout={logout}>
                <CourseDetail />
              </MainLayout>
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

  const handleLogin = async (email, password) => {
    const res = await login(email, password);

    if (res.success) {
      navigate("/dashboard");
    } else {
      alert(res.message);
    }
  };

  if (isAuth) return <Navigate to="/dashboard" />;

  return <Login onLogin={handleLogin} />;
};
