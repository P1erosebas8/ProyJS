import { useNavigate } from "react-router-dom";
import { useCrud } from "../hooks/useCrud";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Contador } from "../components/Contador";
import { Mensaje } from "../components/Mensaje";
import { Reloj } from "../components/Reloj";
import { Weather } from "../components/Weather";
import { ImagenPorPalabra } from "../components/ImagenPorPalabra";

export const Dashboard = ({ logout }) => {
    const { items, addItem, deleteItem, editItem } = useCrud("data");
    const [text, setText] = useState("");
    const [editing, setEditing] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("visits");
        logout();
        navigate("/");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editing) {
            editItem(editing, { text });
            setEditing(null);
        } else {
            addItem({ text });
        }
        setText("");
    };

    return (
        <>
            <div className="container-fluid text-white mt-4 py-4" style={{ backgroundColor: "#363636ff", minHeight: "872px" }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h2 className="m-0">Cosas por hacer</h2>
                    <Weather />
                </div>

                <Mensaje />
                <Contador reset={false} />

                <form onSubmit={handleSubmit} className="d-flex gap-2 my-3">
                    <input
                        className="form-control"
                        value={text}
                        placeholder="Nuevo item"
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button className="btn btn-success">{editing ? "Actualizar" : "Agregar"}</button>
                </form>

                <ul className="list-group">
                    {items.map(item => (
                        <li className="list-group-item d-flex align-items-center justify-content-between" key={item.id}>
                            <div className="d-flex align-items-center">
                                {/* Imagen relacionada con el texto */}
                                <ImagenPorPalabra palabra={item.text} />
                                <span className="ms-3">{item.text}</span>
                            </div>

                            <div>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => {
                                        setEditing(item.id);
                                        setText(item.text);
                                    }}
                                >
                                    Editar
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteItem(item.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                <button className="btn btn-danger mt-3" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </div>

            <div className="bg-dark text-white text-end" style={{ padding: "10px 0", textAlign: "center", marginTop: "auto" }}>
                <Reloj />
            </div>
        </>
    );
};
