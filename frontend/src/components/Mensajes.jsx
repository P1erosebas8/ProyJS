import { useState, useEffect } from "react";
import { MainLayout } from "../layouts/MainLayout";

export const Mensajes = () => {
    const [mensajes, setMensajes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMensaje, setSelectedMensaje] = useState(null);
    const [replyText, setReplyText] = useState("");

    useEffect(() => {
        // Simulación de carga de datos - en una implementación real, esto vendría de tu API
        const fetchMensajes = async () => {
            try {
                
                const data = [
                    { 
                        id: 1, 
                        remitente: "estudiante1@ejemplo.com", 
                        asunto: "Duda sobre el curso de React", 
                        contenido: "Hola, tengo una duda sobre el componente useState en React. ¿Podrían explicarme mejor cómo funciona?",
                        fecha: "2023-05-15",
                        leido: false
                    },
                    { 
                        id: 2, 
                        remitente: "estudiante2@ejemplo.com", 
                        asunto: "Problema con la instalación de Node.js", 
                        contenido: "Estoy intentando instalar Node.js en Windows pero me da un error. ¿Qué puedo hacer?",
                        fecha: "2023-05-14",
                        leido: true
                    },
                    { 
                        id: 3, 
                        remitente: "profesor1@ejemplo.com", 
                        asunto: "Sugerencia para nuevo curso", 
                        contenido: "Hola, me gustaría sugerir la creación de un curso sobre Vue.js. Creo que sería muy útil para los estudiantes.",
                        fecha: "2023-05-13",
                        leido: true
                    }
                ];
                
                setTimeout(() => {
                    setMensajes(data);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error("Error al obtener mensajes:", error);
                setLoading(false);
            }
        };

        fetchMensajes();
    }, []);

    const handleSelectMensaje = (mensaje) => {
        setSelectedMensaje(mensaje);
        
        if (!mensaje.leido) {
            setMensajes(mensajes.map(m => 
                m.id === mensaje.id ? { ...m, leido: true } : m
            ));
        }
    };

    const handleReply = () => {
        
        alert(`Respuesta enviada a ${selectedMensaje.remitente}: ${replyText}`);
        setReplyText("");
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este mensaje?")) {
            
            setMensajes(mensajes.filter(mensaje => mensaje.id !== id));
            if (selectedMensaje && selectedMensaje.id === id) {
                setSelectedMensaje(null);
            }
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <h2 className="mb-4">Gestión de Mensajes</h2>

            <div className="row">
                <div className="col-md-4">
                    <div className="card" style={{ background: "#2b2c34" }}>
                        <div className="card-header bg-dark text-white">
                            <h5 className="mb-0">Bandeja de Entrada</h5>
                        </div>
                        <div className="list-group list-group-flush">
                            {mensajes.map(mensaje => (
                                <div 
                                    key={mensaje.id}
                                    className={`list-group-item list-group-item-action ${selectedMensaje && selectedMensaje.id === mensaje.id ? "active" : ""} ${!mensaje.leido ? "bg-dark text-white" : "bg-secondary text-white"}`}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleSelectMensaje(mensaje)}
                                >
                                    <div className="d-flex w-100 justify-content-between">
                                        <h6 className="mb-1">{mensaje.asunto}</h6>
                                        <small>{mensaje.fecha}</small>
                                    </div>
                                    <p className="mb-1">{mensaje.remitente}</p>
                                    {!mensaje.leido && <span className="badge bg-primary">Nuevo</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    {selectedMensaje ? (
                        <div className="card" style={{ background: "#2b2c34" }}>
                            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">{selectedMensaje.asunto}</h5>
                                <button 
                                    className="btn btn-sm btn-danger" 
                                    onClick={() => handleDelete(selectedMensaje.id)}
                                >
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <strong>De:</strong> {selectedMensaje.remitente}
                                </div>
                                <div className="mb-3">
                                    <strong>Fecha:</strong> {selectedMensaje.fecha}
                                </div>
                                <div className="mb-4">
                                    <strong>Mensaje:</strong>
                                    <p className="mt-2">{selectedMensaje.contenido}</p>
                                </div>
                                
                                <div className="border-top pt-3">
                                    <h6>Responder</h6>
                                    <textarea 
                                        className="form-control mb-3" 
                                        rows="4" 
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Escribe tu respuesta aquí..."
                                    ></textarea>
                                    <button className="btn btn-primary" onClick={handleReply}>
                                        Enviar Respuesta
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="card" style={{ background: "#2b2c34" }}>
                            <div className="card-body text-center">
                                <p>Selecciona un mensaje para ver su contenido.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};