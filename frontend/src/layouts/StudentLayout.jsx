import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGauge,
    faBook,
    faUserGraduate,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export const StudentLayout = ({ children, logout }) => {
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const user = JSON.parse(savedUser);
            setUserEmail(user.email.split("@")[0]);
        }
    }, []);

    const handleLogout = () => {
        logout();
        localStorage.removeItem("visits");
        navigate("/");
    };

    return (
        <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#1e1f26" }}>
            <aside className="d-flex flex-column p-3 shadow" style={{ width: "250px", backgroundColor: "#0b0f3f", color: "white", minHeight: "100vh" }}>
                <h4 className="text-center mb-4 fw-bold">Hola, <strong>{userEmail || "Estudiante"}</strong></h4>
                <div className="d-flex flex-column gap-2">
                    <button className="btn btn-sidebar text-start text-white" onClick={() => navigate('/student-dashboard')}>
                        <FontAwesomeIcon icon={faGauge} className="me-2" /> Dashboard
                    </button>
                    <button className="btn btn-sidebar text-start text-white" onClick={() => navigate('/student-courses')}>
                        <FontAwesomeIcon icon={faBook} className="me-2" /> Mis Cursos
                    </button>
                    <button className="btn btn-sidebar text-start text-white" onClick={() => navigate('/student-enrollments')}>
                        <FontAwesomeIcon icon={faUserGraduate} className="me-2" /> Inscripciones
                    </button>
                </div>
                <div className="mt-auto pt-3">
                    <button type="button" className="btn w-100 btn-danger d-flex align-items-center justify-content-center gap-2" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} /> Cerrar Sesión
                    </button>
                </div>
            </aside>
            <main className="flex-grow-1 p-4 text-white">
                {children}
            </main>
        </div>
    );
};