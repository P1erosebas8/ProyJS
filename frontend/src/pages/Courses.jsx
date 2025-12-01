import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/courses")
            .then((res) => res.json())
            .then((data) => setCourses(data))
            .catch((err) => console.error("Error fetching courses:", err));
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Cursos Disponibles</h2>
            <div className="row">
                {courses.map((course) => (
                    <div key={course.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <img
                                src={course.imagen}
                                className="card-img-top"
                                alt={course.titulo}
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{course.titulo}</h5>
                                <p className="card-text flex-grow-1">{course.descripcion}</p>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <span className="fw-bold text-primary">
                                        {course.precio > 0 ? `$${course.precio}` : "Gratis"}
                                    </span>
                                    <Link to={`/cursos/${course.id}`} className="btn btn-primary">
                                        Ver Curso
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
