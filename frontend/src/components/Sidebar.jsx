import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGauge,
    faEnvelope,
    faClipboardCheck,
    faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export const Sidebar = ({ onLogout }) => {
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            const user = JSON.parse(savedUser);
            const correo = user.email || "";
            setUserEmail(correo.split("@")[0]);
        }
    }, []);

    return (
        <aside
            className="d-flex flex-column p-3 shadow"
            style={{
                width: "250px",
                backgroundColor: "#0b0f3f",
                color: "white",
                minHeight: "100vh",
            }}
        >
            <h4 className="text-center mb-4 fw-bold" style={{ letterSpacing: "1px" }}>
                Hola,<strong>{userEmail || "Usuario"}</strong>
            </h4>

            <div className="d-flex flex-column gap-2">

                <button className="btn btn-sidebar text-start text-white">
                    <FontAwesomeIcon icon={faGauge} className="me-2" />
                    Dashboard
                </button>

                <button className="btn btn-sidebar text-start text-white">
                    <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                    Mensajes
                </button>

                <button className="btn btn-sidebar text-start text-white">
                    <FontAwesomeIcon icon={faClipboardCheck} className="me-2" />
                    Tareas
                </button>
            </div>

            <div className="mt-auto pt-3">
                <button
                    type="button"
                    className="btn w-100 btn-danger d-flex align-items-center justify-content-center gap-2"
                    onClick={onLogout}
                >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
};
