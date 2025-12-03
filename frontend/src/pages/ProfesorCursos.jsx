import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate

export const ProfesorCursos = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate(); // Inicializamos el hook de navegación

  useEffect(() => {
    setCourses([
      { id: 1, title: "Introducción a React", description: "Curso básico de React." },
      { id: 2, title: "Node.js y Express", description: "Backend con Node.js y Express." },
      { id: 3, title: "Bases de Datos Relacionales", description: "Bases de datos con SQL." },
    ]);
  }, []);

  const handleCourseClick = (courseId) => {
    // Redirige a la página de detalles del curso
    navigate(`/profesor-cursos/${courseId}`);
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4" style={{ color: "#4CAF50" }}>
        Mis Cursos
      </h2>

      <div className="row justify-content-center">
        {courses.map((course) => (
          <div key={course.id} className="col-md-4 mb-4">
            <div className="card" style={{ backgroundColor: "#2b2d34", color: "white" }}>
              <div className="card-body">
                <h3 className="card-title">{course.title}</h3>
                <p className="card-text">{course.description}</p>
                <button
                  className="btn btn-success w-100"
                  onClick={() => handleCourseClick(course.id)} // Llama a handleCourseClick para redirigir
                >
                  Gestionar Curso
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
