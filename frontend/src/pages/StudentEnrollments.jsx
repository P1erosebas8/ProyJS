import { useState, useEffect } from "react";

export const StudentEnrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // En una app real, esto vendría de tu API
        const data = [
            { id: 1, curso_titulo: "Introducción a React", fecha_inscripcion: "2023-09-15", progreso: 75, estado: "activo" },
            { id: 2, curso_titulo: "Node.js y Express", fecha_inscripcion: "2023-10-01", progreso: 30, estado: "activo" },
            { id: 3, curso_titulo: "JavaScript Avanzado", fecha_inscripcion: "2023-08-20", progreso: 100, estado: "completado" },
        ];
        setTimeout(() => { setEnrollments(data); setLoading(false); }, 500);
    }, []);

    if (loading) return <div className="text-center mt-4"><div className="spinner-border"></div></div>;

    return (
        <>
            <h2 className="mb-4">Mis Inscripciones</h2>

            <div className="card" style={{ background: "#2b2c34" }}>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-dark table-hover">
                            <thead>
                                <tr>
                                    <th>Curso</th>
                                    <th>Fecha de Inscripción</th>
                                    <th>Progreso</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollments.map(enrollment => (
                                    <tr key={enrollment.id}>
                                        <td>{enrollment.curso_titulo}</td>
                                        <td>{enrollment.fecha_inscripcion}</td>
                                        <td>
                                            <div className="progress" style={{ width: "100px" }}>
                                                <div 
                                                    className="progress-bar bg-success" 
                                                    role="progressbar" 
                                                    style={{ width: `${enrollment.progreso}%` }}
                                                    aria-valuenow={enrollment.progreso} 
                                                    aria-valuemin="0" 
                                                    aria-valuemax="100"
                                                >
                                                    {enrollment.progreso}%
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`badge ${enrollment.estado === 'activo' ? 'bg-primary' : 'bg-success'}`}>
                                                {enrollment.estado === 'activo' ? 'En Curso' : 'Completado'}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-primary">
                                                <i className="fa fa-play"></i> Continuar
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