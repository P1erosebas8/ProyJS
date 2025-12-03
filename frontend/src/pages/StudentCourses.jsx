import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const StudentCourses = () => {
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user) return;

        const loadData = async () => {
            try {
                const resCourses = await fetch("http://localhost:3000/api/cursos");
                const allCourses = await resCourses.json();

                const resEnroll = await fetch(`http://localhost:3000/api/inscripciones/usuario/${user.id}`);
                const inscripciones = await resEnroll.json();

                const enrolled = inscripciones.map(item => ({
                    id: item.curso.id,
                    titulo: item.curso.titulo,
                    descripcion: item.curso.descripcion,
                    progreso: 0,
                    fecha_inscripcion: item.fecha_inscripcion
                }));

                const available = allCourses.filter(
                    c => !enrolled.some(e => e.id === c.id)
                );

                setEnrolledCourses(enrolled);
                setCourses(available);
                setLoading(false);

            } catch (error) {
                console.log("Error cargando cursos:", error);
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleEnroll = async (courseId) => {
        try {
            const body = {
                usuario_id: user.id,
                curso_id: courseId
            };

            const res = await fetch("http://localhost:3000/api/inscripciones", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                alert("Error al inscribirse");
                return;
            }

            const course = courses.find(c => c.id === courseId);

            const newEnrollment = {
                ...course,
                progreso: 0,
                fecha_inscripcion: new Date().toISOString().split("T")[0]
            };

            setEnrolledCourses([...enrolledCourses, newEnrollment]);
            setCourses(courses.filter(c => c.id !== courseId));

            alert("Inscripción realizada con éxito");

        } catch (error) {
            console.log("Error inscribiendo:", error);
        }
    };

    if (loading)
        return (
            <div className="text-center mt-4">
                <div className="spinner-border"></div>
            </div>
        );

    return (
        <>
            <h2 className="mb-4">Mis Cursos</h2>

            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#enrolled">
                        Cursos Inscritos
                    </button>
                </li>
                <li className="nav-item">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#available">
                        Cursos Disponibles
                    </button>
                </li>
            </ul>

            <div className="tab-content">
                <div className="tab-pane fade show active" id="enrolled">
                    {enrolledCourses.length > 0 ? (
                        <div className="row">
                            {enrolledCourses.map(course => (
                                <div className="col-md-4 mb-4" key={course.id}>
                                    <div className="card h-100" style={{ background: "#2b2c34" }}>
                                        <div className="card-body">
                                            <h5 className="card-title" style={{color:"white"}}>{course.titulo}</h5>
                                            <p className="card-text" style={{color:"white"}}>{course.descripcion}</p>
                                            <p className="card-text" style={{color:"white"}}>
                                                <small>Inscrito el: {course.fecha_inscripcion}</small>
                                            </p>

                                            <div className="progress mb-3">
                                                <div
                                                    className="progress-bar bg-success"
                                                    role="progressbar"
                                                    style={{ width: `${course.progreso}%` }}
                                                >
                                                    {course.progreso}%
                                                </div>
                                            </div>

                                            <Link
                                                to={`/student-courses/${course.id}`}
                                                className="btn btn-primary"
                                            >
                                                <i className="fa fa-play"></i> Continuar Curso
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="alert alert-info">
                            No estás inscrito en ningún curso aún.
                        </div>
                    )}
                </div>

                <div className="tab-pane fade" id="available">
                    {courses.length > 0 ? (
                        <div className="row">
                            {courses.map(course => (
                                <div className="col-md-4 mb-4" key={course.id}>
                                    <div className="card h-100" style={{ background: "#2b2c34" }}>
                                        <div className="card-body">
                                            <h5 className="card-title" style={{color:"white"}}>{course.titulo}</h5>
                                            <p className="card-text" style={{color:"white"}}>{course.descripcion}</p>
                                            <p className="card-text" style={{color:"white"}}>
                                                <span className="badge bg-success">
                                                    {course.precio > 0 ? `S/. ${course.precio}` : "Gratis"}
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
