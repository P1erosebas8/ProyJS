import { Sidebar } from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export const MainLayout = ({ children, logout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        localStorage.removeItem("visits");
        navigate("/");
    };

    return (
        <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#1e1f26" }}>
            <Sidebar onLogout={handleLogout} />
            <main className="flex-grow-1 p-4 text-white">
                {children}
            </main>
        </div>
    );
};
