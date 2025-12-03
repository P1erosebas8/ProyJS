import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const StudentCourses = () => {
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // En una app real, esto vendría de tu API
        // Cursos disponibles
        const availableCourses = [
            { id: 1, titulo: "Introducción a React", descripcion: "Aprende los fundamentos de React.", precio: 0.00 },
            { id: 2, titulo: "Node.js y Express", descripcion: "Construye APIs RESTful robustas.", precio: 10.00 },
            { id: 3, titulo: "JavaScript Avanzado", descripcion: "Profundiza en JavaScript moderno.", precio: 15.00 },
        ];
        
        // Cursos inscritos
        const enrolled = [
            { id: 1, titulo: "Introducción a React", progreso: 75, fecha_inscripcion: "2023-09-15" },
            { id: 2, titulo: "Node.js y Express", progreso: 30, fecha_inscripcion: "2023-10-01" },
        ];
        
        setTimeout(() => { 
            setCourses(availableCourses); 
            setEnrolledCourses(enrolled); 
            setLoading(false); 
        }, 500);
    }, []);

    const handleEnroll = (courseId) => {
        const course = courses.find(c => c.id === courseId);
        if (course) {
            const newEnrollment = {
                ...course,
                progreso: 0,
                fecha_inscripcion: new Date().toISOString().split('T')[0]
            };
            setEnrolledCourses([...enrolledCourses, newEnrollment]);
            setCourses(courses.filter(c => c.id !== courseId));
        }
    };

    if (loading) return <div className="text-center mt-4"><div className="spinner-border"></div></div>;

    return (
        <>
            <h2 className="mb-4">Mis Cursos</h2>

            {/* Pestañas para cursos inscritos y disponibles */}
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#enrolled">Cursos Inscritos</button>
                </li>
                <li className="nav-item">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#available">Cursos Disponibles</button>
                </li>
            </ul>

            <div className="tab-content">
                {/* Cursos inscritos */}
                <div className="tab-pane fade show active" id="enrolled">
                    {enrolledCourses.length > 0 ? (
                        <div className="row">
                            {enrolledCourses.map(course => (
                                <div className="col-md-4 mb-4" key={course.id}>
                                    <div className="card h-100" style={{ background: "#2b2c34" }}>
                                        <div className="card-body">
                                            <h5 className="card-title">{course.titulo}</h5>
                                            <p className="card-text">{course.descripcion}</p>
                                            <p className="card-text"><small>Inscrito el: {course.fecha_inscripcion}</small></p>
                                            <div className="progress mb-3">
                                                <div 
                                                    className="progress-bar bg-success" 
                                                    role="progressbar" 
                                                    style={{ width: `${course.progreso}%` }}
                                                    aria-valuenow={course.progreso} 
                                                    aria-valuemin="0" 
                                                    aria-valuemax="100"
                                                >
                                                    {course.progreso}%
                                                </div>
                                            </div>
                                            <Link to={`/student-courses/${course.id}`} className="btn btn-primary">
                                                <i className="fa fa-play"></i> Continuar Curso
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="alert alert-info">
                            No estás inscrito en ningún curso aún. Revisa la pestaña de "Cursos Disponibles".
                        </div>
                    )}
                </div>

                {/* Cursos disponibles */}
                <div className="tab-pane fade" id="available">
                    {courses.length > 0 ? (
                        <div className="row">
                            {courses.map(course => (
                                <div className="col-md-4 mb-4" key={course.id}>
                                    <div className="card h-100" style={{ background: "#2b2c34" }}>
                                        <div className="card-body">
                                            <h5 className="card-title">{course.titulo}</h5>
                                            <p className="card-text">{course.descripcion}</p>
                                            <p className="card-text">
                                                <span className="badge bg-success">
                                                    {course.precio > 0 ? `$${course.precio}` : "Gratis"}
                                                </span>
                                            </p>
                                            <button 
                                                className="btn btn-success" 
                                                onClick={() => handleEnroll(course.id)}
                                            >
                                                <i className="fa fa-plus"></i> Inscribirse
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="alert alert-info">
                            No hay cursos disponibles en este momento.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};