

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGauge,
    faUsers,
    faBook,
    faRightFromBracket,
    faUserGraduate 
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export const Sidebar = ({ onLogout }) => {
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const user = JSON.parse(savedUser);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUserEmail(user.email.split("@")[0]);
        }
    }, []);

    return (
        <aside className="d-flex flex-column p-3 shadow" style={{ width: "250px", backgroundColor: "#0b0f3f", color: "white", minHeight: "100vh" }}>
            <h4 className="text-center mb-4 fw-bold">Hola, <strong>{userEmail || "Admin"}</strong></h4>
            <div className="d-flex flex-column gap-2">
                <button className="btn btn-sidebar text-start text-white" onClick={() => navigate('/dashboard')}>
                    <FontAwesomeIcon icon={faGauge} className="me-2" /> Dashboard
                </button>
                <button className="btn btn-sidebar text-start text-white" onClick={() => navigate('/usuarios')}>
                    <FontAwesomeIcon icon={faUsers} className="me-2" /> Usuarios
                </button>
                <button className="btn btn-sidebar text-start text-white" onClick={() => navigate('/cursos')}>
                    <FontAwesomeIcon icon={faBook} className="me-2" /> Cursos
                </button>
                <button className="btn btn-sidebar text-start text-white" onClick={() => navigate('/inscripciones')}>
                    <FontAwesomeIcon icon={faUserGraduate} className="me-2" /> Inscripciones
                </button>
            </div>
            <div className="mt-auto pt-3">
                <button type="button" className="btn w-100 btn-danger d-flex align-items-center justify-content-center gap-2" onClick={onLogout}>
                    <FontAwesomeIcon icon={faRightFromBracket} /> Cerrar Sesión
                </button>
            </div>
        </aside>
    );
};