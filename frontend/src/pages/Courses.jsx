

import { useState, useEffect } from "react";

export const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [courseActual, setCourseActual] = useState({ id: null, titulo: "", descripcion: "", precio: 0.00 });

    useEffect(() => {
        fetch("http://localhost:3000/api/cursos")
            .then(res => res.json())
            .then(data => {
                setCourses(data);
                setLoading(false);
            });
    }, []);


    const handleEdit = (course) => {
        setCourseActual(course);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar este curso?")) return;

        await fetch(`http://localhost:3000/api/cursos/${id}`, {
            method: "DELETE"
        });

        setCourses(courses.filter(c => c.id !== id));
    };

    const handleSave = async () => {
        const payload = {
            titulo: courseActual.titulo,
            descripcion: courseActual.descripcion,
            imagen: courseActual.imagen,
            precio: courseActual.precio
        };

        if (courseActual.id) {
            // EDITAR
            await fetch(`http://localhost:3000/api/cursos/${courseActual.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            setCourses(courses.map(c => c.id === courseActual.id ? { ...courseActual } : c));
        } else {
            // AGREGAR NUEVO
            const res = await fetch("http://localhost:3000/api/cursos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const nuevo = await res.json();
            setCourses([...courses, nuevo]);
        }

        setShowModal(false);
        setCourseActual({ id: null, titulo: "", descripcion: "", imagen: "", precio: 0 });
    };

    if (loading) return <div className="text-center mt-4"><div className="spinner-border"></div></div>;

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Cursos</h2>
                <button className="btn btn-primary" onClick={() => { setCourseActual({ id: null, titulo: "", descripcion: "", precio: 0.00 }); setShowModal(true); }}>
                    <i className="fa fa-plus me-2"></i>Nuevo Curso
                </button>
            </div>

            <div className="card" style={{ background: "#2b2c34" }}>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-dark table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Título</th>
                                    <th>Precio</th>
                                    <th>Descripcion</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map(course => (
                                    <tr key={course.id}>
                                        <td>{course.id}</td>
                                        <td>{course.titulo}</td>
                                        <td>{course.precio > 0 ? `$${course.precio}` : "Gratis"}</td>
                                        <td>{course.descripcion}</td>
                                        <td>
                                            <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(course)}>Editar<i className="fa fa-edit"></i></button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(course.id)}>Eliminar<i className="fa fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            {showModal && (
                <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark text-white">
                            <div className="modal-header">
                                <h5 className="modal-title">{courseActual.id ? "Editar Curso" : "Nuevo Curso"}</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Título</label>
                                    <input type="text" className="form-control" value={courseActual.titulo} onChange={(e) => setCourseActual({ ...courseActual, titulo: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Descripción</label>
                                    <textarea className="form-control" rows="3" value={courseActual.descripcion} onChange={(e) => setCourseActual({ ...courseActual, descripcion: e.target.value })}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Precio</label>
                                    <input type="number" className="form-control" step="0.01" value={courseActual.precio} onChange={(e) => setCourseActual({ ...courseActual, precio: parseFloat(e.target.value) })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Imagen (URL)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={courseActual.imagen}
                                        onChange={(e) => setCourseActual({ ...courseActual, imagen: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={handleSave}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};