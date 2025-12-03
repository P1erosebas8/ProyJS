

import { useState, useEffect } from "react";

export const Inscripciones = () => {
    const [inscripciones, setInscripciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const data = [
            { id: 1, usuario_email: "estudiante1@ejemplo.com", curso_titulo: "Introducción a React", fecha_inscripcion: "2023-10-01" },
            { id: 2, usuario_email: "estudiante2@ejemplo.com", curso_titulo: "Node.js y Express", fecha_inscripcion: "2023-10-05" },
            { id: 3, usuario_email: "estudiante1@ejemplo.com", curso_titulo: "Node.js y Express", fecha_inscripcion: "2023-10-06" },
        ];
        setTimeout(() => { setInscripciones(data); setLoading(false); }, 500);
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta inscripción?")) {
            setInscripciones(inscripciones.filter(i => i.id !== id));
        }
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
                                        <td>{inscripcion.usuario_email}</td>
                                        <td>{inscripcion.curso_titulo}</td>
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