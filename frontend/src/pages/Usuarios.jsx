

import { useState, useEffect } from "react";

export const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [usuarioActual, setUsuarioActual] = useState({ id: null, email: "", rol: "estudiante" });

    useEffect(() => {
        fetch("http://localhost:3000/api/usuarios")
            .then(res => res.json())
            .then(data => {
                setUsuarios(data);
                setLoading(false);
            });
    }, []);


    const handleEdit = (usuario) => {
        setUsuarioActual(usuario);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar usuario?")) return;

        await fetch(`http://localhost:3000/api/usuarios/${id}`, {
            method: "DELETE"
        });

        setUsuarios(usuarios.filter(u => u.id !== id));
    };

    const handleSave = async () => {
        const payload = {
            email: usuarioActual.email,
            password: usuarioActual.password,
            rol: usuarioActual.rol
        };

        if (usuarioActual.id) {
            // EDITAR
            await fetch(`http://localhost:3000/api/usuarios/${usuarioActual.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            setUsuarios(usuarios.map(u => u.id === usuarioActual.id ? { ...usuarioActual } : u));
        } else {
            // AGREGAR
            const res = await fetch("http://localhost:3000/api/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const nuevo = await res.json();
            setUsuarios([...usuarios, nuevo]);
        }

        setShowModal(false);
        setUsuarioActual({ id: null, email: "", password: "", rol: "estudiante" });
    };


    if (loading) return <div className="text-center mt-4"><div className="spinner-border"></div></div>;

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Usuarios</h2>
                <button className="btn btn-primary" onClick={() => { setUsuarioActual({ id: null, email: "", rol: "estudiante" }); setShowModal(true); }}>
                    <i className="fa fa-plus me-2"></i>Nuevo Usuario
                </button>
            </div>

            <div className="card" style={{ background: "#2b2c34" }}>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-dark table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map(usuario => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.email}</td>
                                        <td><span className={`badge ${usuario.rol === 'administrador' ? 'bg-danger' : 'bg-info'}`}>{usuario.rol}</span></td>
                                        <td>
                                            <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(usuario)}>Editar
                                                <i className="fa fa-edit"></i>
                                            </button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(usuario.id)}>Eliminar
                                                <i className="fa fa-trash"></i>
                                            </button>
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
                                <h5 className="modal-title">{usuarioActual.id ? "Editar Usuario" : "Nuevo Usuario"}</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" value={usuarioActual.email} onChange={(e) => setUsuarioActual({ ...usuarioActual, email: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={usuarioActual.password}
                                        onChange={(e) => setUsuarioActual({ ...usuarioActual, password: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Rol</label>
                                    <select className="form-select" value={usuarioActual.rol} onChange={(e) => setUsuarioActual({ ...usuarioActual, rol: e.target.value })}>
                                        <option value="estudiante">Estudiante</option>
                                        <option value="profesor">Profesor</option>
                                        <option value="administrador">Administrador</option>
                                    </select>
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