import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/courses/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCourse(data);
                if (data.lecciones && data.lecciones.length > 0) {
                    setSelectedLesson(data.lecciones[0]);
                }
            })
            .catch((err) => console.error("Error fetching course details:", err));
    }, [id]);

    if (!course) return <div className="container mt-4">Cargando...</div>;

    return (
        <div className="container mt-4">
            <div className="row">
                
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">{course.titulo}</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            {course.lecciones && course.lecciones.map((lesson) => (
                                <li
                                    key={lesson.id}
                                    className={`list-group-item list-group-item-action ${selectedLesson && selectedLesson.id === lesson.id ? "active" : ""
                                        }`}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setSelectedLesson(lesson)}
                                >
                                    {lesson.orden}. {lesson.titulo}
                                </li>
                            ))}
                            {(!course.lecciones || course.lecciones.length === 0) && (
                                <li className="list-group-item text-muted">No hay lecciones disponibles.</li>
                            )}
                        </ul>
                    </div>
                </div>

                
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
