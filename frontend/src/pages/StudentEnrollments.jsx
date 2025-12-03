import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const StudentEnrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadEnrollments = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/student/enrollments", {
                    credentials: "include"
                });

                if (!res.ok) {
                    console.error("Error al cargar inscripciones");
                    setLoading(false);
                    return;
                }

                const data = await res.json();
                setEnrollments(data);
            } catch (err) {
                console.error("Error en fetch:", err);
            } finally {
                setLoading(false);
            }
        };

        loadEnrollments();
    }, []);

    if (loading)
        return (
            <div className="text-center mt-4">
                <div className="spinner-border"></div>
            </div>
        );

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
                                {enrollments.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center text-muted">
                                            No tienes cursos inscritos aún.
                                        </td>
                                    </tr>
                                )}

                                {enrollments.map((enrollment) => (
                                    <tr key={enrollment.id}>
                                        <td>{enrollment.curso_titulo}</td>

                                        <td>
                                            {new Date(enrollment.fecha_inscripcion).toLocaleDateString()}
                                        </td>

                                        <td>
                                            <div className="progress" style={{ width: "100px" }}>
                                                <div
                                                    className="progress-bar bg-success"
                                                    role="progressbar"
                                                    style={{ width: `${enrollment.progreso}%` }}
                                                >
                                                    {enrollment.progreso}%
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <span
                                                className={`badge ${
                                                    enrollment.estado === "activo" ? "bg-primary" : "bg-success"
                                                }`}
                                            >
                                                {enrollment.estado === "activo" ? "En Curso" : "Completado"}
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => navigate(`/student/course/${enrollment.curso_id}`)}
                                            >
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
