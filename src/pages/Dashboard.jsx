import { MainLayout } from "../layouts/MainLayout";
import { Reloj } from "../components/Reloj";
import { Weather } from "../components/Weather";
import { Mensaje } from "../components/Mensaje";
import { Contador } from "../components/Contador";
import { useCrud } from "../hooks/useCrud";
import { useState } from "react";
import { ImagenPorPalabra } from "../components/ImagenPorPalabra";

export const Dashboard = () => {
    const { items, addItem, deleteItem, editItem } = useCrud("data");
    const [text, setText] = useState("");
    const [editing, setEditing] = useState(null);

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
            <h2 className="fw-bold mb-4">Bienvenido</h2>

            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="p-3 rounded" style={{ background: "#2b2c34" }}>
                        <Reloj />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="p-3 rounded" style={{ background: "#2b2c34" }}>
                        <Weather />
                    </div>
                </div>
            </div>

            <div className="mb-4 p-3 rounded" style={{ background: "#2b2c34" }}>
                <Mensaje />
            </div>

            <div className="mb-4 p-3 rounded" style={{ background: "#2b2c34" }}>
                <Contador reset={false} />
            </div>

            <form onSubmit={handleSubmit} className="d-flex gap-2 my-3">
                <input
                    className="form-control"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Nuevo item"
                />
                <button className="btn btn-primary">
                    {editing ? "Actualizar" : "Agregar"}
                </button>
            </form>

            <div className="row">
                {items.map((item) => (
                    <div className="col-md-4 mb-3" key={item.id}>
                        <div
                            className="p-3 rounded h-100 d-flex flex-column justify-content-between"
                            style={{ background: "#2b2c34" }}
                        >
                            <div className="d-flex align-items-center">
                                <ImagenPorPalabra palabra={item.text} />
                                <span className="ms-3">{item.text}</span>
                            </div>

                            <div className="text-end mt-3">
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
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
