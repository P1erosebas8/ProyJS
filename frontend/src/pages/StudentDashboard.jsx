import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const StudentDashboard = () => {
    const [stats, setStats] = useState({
        cursosInscritos: 0,
        cursosCompletados: 0,
        leccionesCompletadas: 0
    });

    const [recentCourses, setRecentCourses] = useState([]);
    const usuario = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!usuario) return;

        const cargarInscripciones = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/inscripciones/usuario/${usuario.id}`);
                const data = await res.json();

                const inscritos = data.length;

                const recientes = data
                    .sort((a, b) => new Date(b.fecha_inscripcion) - new Date(a.fecha_inscripcion))
                    .map(item => ({
                        id: item.curso.id,
                        titulo: item.curso.titulo,
                        progreso: 0
                    }))
                    .slice(0, 5);

                setStats(prev => ({
                    ...prev,
                    cursosInscritos: inscritos
                }));

                setRecentCourses(recientes);

            } catch (error) {
                console.log("Error cargando inscripciones:", error);
            }
        };

        cargarInscripciones();

    }, []);

    return (
        <>
            <h2 className="fw-bold mb-4">Panel de Estudiante</h2>

            <div className="row mb-4">

                <div className="col-md-4 mb-3">
                    <div className="card bg-primary text-white h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h4 className="mb-0">{stats.cursosInscritos}</h4>
                                    <p>Cursos Inscritos</p>
                                </div>
                                <div className="align-self-center">
                                    <i className="fa fa-book fa-2x"></i>
                                </div>
                            </div>
                            <Link to="/student-courses" className="btn btn-sm btn-light mt-2">Ver Cursos</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card bg-success text-white h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h4 className="mb-0">{stats.cursosCompletados}</h4>
                                    <p>Cursos Completados</p>
                                </div>
                                <div className="align-self-center">
                                    <i className="fa fa-check-circle fa-2x"></i>
                                </div>
                            </div>
                            <Link to="/student-courses" className="btn btn-sm btn-light mt-2">Ver Historial</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card bg-info text-white h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h4 className="mb-0">{stats.leccionesCompletadas}</h4>
                                    <p>Lecciones Completadas</p>
                                </div>
                                <div className="align-self-center">
                                    <i className="fa fa-tasks fa-2x"></i>
                                </div>
                            </div>
                            <Link to="/student-courses" className="btn btn-sm btn-light mt-2">Continuar Aprendiendo</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card" style={{ background: "#2b2c34" }}>
                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">Cursos Recientes</h5>
                </div>
                <div className="card-body">
                    {recentCourses.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th>Curso</th>
                                        <th>Progreso</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentCourses.map(course => (
                                        <tr key={course.id}>
                                            <td>{course.titulo}</td>
                                            <td>
                                                <div className="progress">
                                                    <div 
                                                        className="progress-bar bg-success"
                                                        role="progressbar"
                                                        style={{ width: `${course.progreso}%` }}
                                                    >
                                                        {course.progreso}%
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <Link to={`/student-courses/${course.id}`} className="btn btn-sm btn-primary">
                                                    <i className="fa fa-play"></i> Continuar
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center">No estás inscrito en ningún curso aún.</p>
                    )}
                </div>
            </div>
        </>
    );
};
