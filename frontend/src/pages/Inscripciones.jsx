

import { useState, useEffect } from "react";

export const Inscripciones = () => {
    const [inscripciones, setInscripciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/api/inscripciones")
            .then(res => res.json())
            .then(data => {
                setInscripciones(data);
                setLoading(false);
            });
    }, []);


    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar inscripción?")) return;

        await fetch(`http://localhost:3000/api/inscripciones/${id}`, {
            method: "DELETE"
        });

        setInscripciones(inscripciones.filter(i => i.id !== id));
    };

    if (loading) return <div className="text-center mt-4"><div className="spinner-border"></div></div>;

    return (
        <>
            <h2 className="mb-4">Gestión de Inscripciones</h2>

            <div className="card" style={{ background: "#2b2c34" }}>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-dark table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Usuario</th>
                                    <th>Curso</th>
                                    <th>Fecha de Inscripción</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inscripciones.map(inscripcion => (
                                    <tr key={inscripcion.id}>
                                        <td>{inscripcion.id}</td>
                                        <td>{inscripcion.email}</td>
                                        <td>{inscripcion.titulo}</td>
                                        <td>{inscripcion.fecha_inscripcion}</td>
                                        <td>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(inscripcion.id)}>
                                                <i className="fa fa-times"></i> Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};