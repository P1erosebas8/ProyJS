import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth,";
import { Login } from "./components/Login";
import { Dashboard } from "./pages/Dashboard";
import { Courses } from "./pages/Courses";
import { Usuarios } from "./pages/Usuarios";
import { Inscripciones } from "./pages/Inscripciones";
import { CourseDetail } from "./pages/CourseDetail";
import { StudentDashboard } from "./pages/StudentDashboard";
import { StudentCourses } from "./pages/StudentCourses";
import { StudentCourseDetail } from "./pages/StudentCourseDetail";
import { StudentEnrollments } from "./pages/StudentEnrollments";
import { RutaProtejida } from "./components/RutaProtejida";
import { MainLayout } from "./layouts/MainLayout";
import { StudentLayout } from "./layouts/StudentLayout";

function App() {
  const { isAuth, userRole, login, logout } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginWrapper login={login} isAuth={isAuth} />} />

        <Route path="/dashboard" element={<RutaProtejida isAuth={isAuth && userRole === 'administrador'}><MainLayout logout={logout}><Dashboard /></MainLayout></RutaProtejida>} />
        <Route path="/usuarios" element={<RutaProtejida isAuth={isAuth && userRole === 'administrador'}><MainLayout logout={logout}><Usuarios /></MainLayout></RutaProtejida>} />
        <Route path="/cursos" element={<RutaProtejida isAuth={isAuth && userRole === 'administrador'}><MainLayout logout={logout}><Courses /></MainLayout></RutaProtejida>} />
        <Route path="/inscripciones" element={<RutaProtejida isAuth={isAuth && userRole === 'administrador'}><MainLayout logout={logout}><Inscripciones /></MainLayout></RutaProtejida>} />
        <Route path="/cursos/:id" element={<RutaProtejida isAuth={isAuth && userRole === 'administrador'}><MainLayout logout={logout}><CourseDetail /></MainLayout></RutaProtejida>} />

        <Route path="/student-dashboard" element={<RutaProtejida isAuth={isAuth && userRole === 'estudiante'}><StudentLayout logout={logout}><StudentDashboard /></StudentLayout></RutaProtejida>} />
        <Route path="/student-courses" element={<RutaProtejida isAuth={isAuth && userRole === 'estudiante'}><StudentLayout logout={logout}><StudentCourses /></StudentLayout></RutaProtejida>} />
        <Route path="/student-courses/:id" element={<RutaProtejida isAuth={isAuth && userRole === 'estudiante'}><StudentLayout logout={logout}><StudentCourseDetail /></StudentLayout></RutaProtejida>} />
        <Route path="/student-enrollments" element={<RutaProtejida isAuth={isAuth && userRole === 'estudiante'}><StudentLayout logout={logout}><StudentEnrollments /></StudentLayout></RutaProtejida>} />

        <Route path="*" element={<Navigate to={isAuth ? (userRole === 'administrador' ? '/dashboard' : '/student-dashboard') : '/'} />} />
      </Routes>
    </BrowserRouter>
  );
}

const LoginWrapper = ({ login, isAuth }) => {
  const navigate = useNavigate();   

  const handleLogin = async (email, password) => {
    const res = await login(email, password);
    if (res.success) {
      navigate(res.role === 'administrador' ? '/dashboard' : '/student-dashboard');
    }
    else alert(res.message);
  };

  if (isAuth) return <Navigate to="/dashboard" />;

  return <Login onLogin={handleLogin} />;
};

export default App;