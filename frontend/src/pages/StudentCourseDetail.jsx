import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const StudentCourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [completedLessons, setCompletedLessons] = useState([]);

    useEffect(() => {
        // En una app real, esto vendría de tu API
        fetch(`http://localhost:3000/api/courses/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCourse(data);
                if (data.lecciones && data.lecciones.length > 0) {
                    setSelectedLesson(data.lecciones[0]);
                    // Simular algunas lecciones completadas
                    setCompletedLessons([1]); // Lección con ID 1 marcada como completada
                }
            })
            .catch((err) => console.error("Error fetching course details:", err));
    }, [id]);

    const toggleLessonComplete = (lessonId) => {
        if (completedLessons.includes(lessonId)) {
            setCompletedLessons(completedLessons.filter(id => id !== lessonId));
        } else {
            setCompletedLessons([...completedLessons, lessonId]);
        }
    };

    if (!course) return <div className="container mt-4">Cargando...</div>;

    const progress = course.lecciones ? Math.round((completedLessons.length / course.lecciones.length) * 100) : 0;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>{course.titulo}</h2>
                <div className="progress" style={{ width: "200px" }}>
                    <div 
                        className="progress-bar bg-success" 
                        role="progressbar" 
                        style={{ width: `${progress}%` }}
                        aria-valuenow={progress} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
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
                            {course.lecciones && course.lecciones.map((lesson) => (
                                <li
                                    key={lesson.id}
                                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                                        selectedLesson && selectedLesson.id === lesson.id ? "active" : ""
                                    }`}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setSelectedLesson(lesson)}
                                >
                                    <span>
                                        {lesson.orden}. {lesson.titulo}
                                    </span>
                                    <button 
                                        className={`btn btn-sm ${completedLessons.includes(lesson.id) ? 'btn-success' : 'btn-outline-secondary'}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleLessonComplete(lesson.id);
                                        }}
                                    >
                                        <i className={`fa ${completedLessons.includes(lesson.id) ? 'fa-check' : 'fa-circle'}`}></i>
                                    </button>
                                </li>
                            ))}
                            {(!course.lecciones || course.lecciones.length === 0) && (
                                <li className="list-group-item text-muted">No hay lecciones disponibles.</li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Contenido de la lección seleccionada */}
                <div className="col-md-8">
                    {selectedLesson ? (
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h3>{selectedLesson.titulo}</h3>
                                <hr />
                                {selectedLesson.video_url && (
                                    <div className="ratio ratio-16x9 mb-4">
                                        <iframe
                                            src={selectedLesson.video_url}
                                            title={selectedLesson.titulo}
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                                <div dangerouslySetInnerHTML={{ __html: selectedLesson.contenido }} />
                                
                                <div className="d-flex justify-content-between mt-4">
                                    <button 
                                        className="btn btn-secondary"
                                        disabled={!course.lecciones || course.lecciones.findIndex(l => l.id === selectedLesson.id) === 0}
                                        onClick={() => {
                                            const currentIndex = course.lecciones.findIndex(l => l.id === selectedLesson.id);
                                            if (currentIndex > 0) {
                                                setSelectedLesson(course.lecciones[currentIndex - 1]);
                                            }
                                        }}
                                    >
                                        <i className="fa fa-arrow-left"></i> Lección Anterior
                                    </button>
                                    
                                    <button 
                                        className={`btn ${completedLessons.includes(selectedLesson.id) ? 'btn-success' : 'btn-primary'}`}
                                        onClick={() => toggleLessonComplete(selectedLesson.id)}
                                    >
                                        {completedLessons.includes(selectedLesson.id) ? 'Completada' : 'Marcar como Completada'}
                                    </button>
                                    
                                    <button 
                                        className="btn btn-secondary"
                                        disabled={!course.lecciones || course.lecciones.findIndex(l => l.id === selectedLesson.id) === course.lecciones.length - 1}
                                        onClick={() => {
                                            const currentIndex = course.lecciones.findIndex(l => l.id === selectedLesson.id);
                                            if (currentIndex < course.lecciones.length - 1) {
                                                setSelectedLesson(course.lecciones[currentIndex + 1]);
                                            }
                                        }}
                                    >
                                        Siguiente Lección <i className="fa fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="alert alert-info">
                            Selecciona una lección para comenzar.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};