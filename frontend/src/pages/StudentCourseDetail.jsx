import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const StudentCourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [completedLessons, setCompletedLessons] = useState([]);

useEffect(() => {
    const loadData = async () => {
        try {
            const cursoRes = await fetch(`http://localhost:3000/api/cursos/${id}`);
            const cursoData = await cursoRes.json();

            setCourse(cursoData);
            if (cursoData.lecciones?.length > 0) setSelectedLesson(cursoData.lecciones[0]);

            // Obtener progreso de usuario 1
            const progresoRes = await fetch(`http://localhost:3000/api/progreso/curso/${id}`);
            const progresoData = await progresoRes.json();
            setCompletedLessons(progresoData.completadas);

        } catch (err) {
            console.error(err);
        }
    };

    loadData();
}, [id]);


    const toggleLessonComplete = async (lessonId) => {
        try {
            const res = await fetch(`http://localhost:3000/api/student/lessons/${lessonId}/complete`, {
                method: "POST",
                credentials: "include"
            });

            if (!res.ok) {
                alert("Error al marcar la lección");
                return;
            }

            // Alternar estado local
            if (completedLessons.includes(lessonId)) {
                setCompletedLessons(completedLessons.filter(id => id !== lessonId));
            } else {
                setCompletedLessons([...completedLessons, lessonId]);
            }

        } catch (err) {
            console.error("Error marking lesson:", err);
        }
    };

    if (!course) return <div className="container mt-4">Cargando...</div>;

    const progress = course.lecciones
        ? Math.round((completedLessons.length / course.lecciones.length) * 100)
        : 0;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>{course.titulo}</h2>

                <div className="progress" style={{ width: "200px" }}>
                    <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${progress}%` }}
                    >
                        {progress}% Completado
                    </div>
                </div>
            </div>

            <div className="row">
                {/* Lista de lecciones */}
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Lecciones</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            {course.lecciones.length > 0 ? (
                                course.lecciones.map((lesson) => (
                                    <li
                                        key={lesson.id}
                                        className={`list-group-item d-flex justify-content-between align-items-center ${selectedLesson?.id === lesson.id ? "active" : ""
                                            }`}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setSelectedLesson(lesson)}
                                    >
                                        <span>{lesson.orden}. {lesson.titulo}</span>

                                        <button
                                            className={`btn btn-sm ${completedLessons.includes(lesson.id)
                                                    ? "btn-success"
                                                    : "btn-outline-secondary"
                                                }`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleLessonComplete(lesson.id);
                                            }}
                                        >
                                            <i className={`fa ${completedLessons.includes(lesson.id)
                                                    ? "fa-check"
                                                    : "fa-circle"
                                                }`}></i>
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item text-muted">No hay lecciones.</li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Contenido */}
                <div className="col-md-8">
                    {selectedLesson ? (
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h3>{selectedLesson.titulo}</h3>
                                <hr />

                                {selectedLesson.video_url && (
                                    <div className="ratio ratio-16x9 mb-4">
                                        <iframe src={selectedLesson.video_url} allowFullScreen></iframe>
                                    </div>
                                )}

                                <div dangerouslySetInnerHTML={{ __html: selectedLesson.contenido }} />

                                <div className="d-flex justify-content-between mt-4">
                                    {/* Anterior */}
                                    <button
                                        className="btn btn-secondary"
                                        disabled={course.lecciones.findIndex(l => l.id === selectedLesson.id) === 0}
                                        onClick={() => {
                                            const currentIndex = course.lecciones.findIndex(l => l.id === selectedLesson.id);
                                            setSelectedLesson(course.lecciones[currentIndex - 1]);
                                        }}
                                    >
                                        ← Anterior
                                    </button>

                                    {/* Completar */}
                                    <button
                                        className={`btn ${completedLessons.includes(selectedLesson.id)
                                                ? "btn-success"
                                                : "btn-primary"
                                            }`}
                                        onClick={() => toggleLessonComplete(selectedLesson.id)}
                                    >
                                        {completedLessons.includes(selectedLesson.id)
                                            ? "Completada"
                                            : "Marcar como Completada"}
                                    </button>

                                    {/* Siguiente */}
                                    <button
                                        className="btn btn-secondary"
                                        disabled={course.lecciones.findIndex(l => l.id === selectedLesson.id) === course.lecciones.length - 1}
                                        onClick={() => {
                                            const currentIndex = course.lecciones.findIndex(l => l.id === selectedLesson.id);
                                            setSelectedLesson(course.lecciones[currentIndex + 1]);
                                        }}
                                    >
                                        Siguiente →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="alert alert-info">Selecciona una lección.</div>
                    )}
                </div>
            </div>
        </div>
    );
};
