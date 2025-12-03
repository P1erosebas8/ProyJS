

import { Reloj } from "../components/Reloj";
import { Weather } from "../components/Weather";
import { Contador } from "../components/Contador";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const Dashboard = () => {
    const [stats, setStats] = useState({
        totalUsuarios: 0,
        totalCursos: 0,
        totalInscripciones: 0
    });

    useEffect(() => {
        // En una app real, esto vendría de tu API
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStats({
            totalUsuarios: 125,
            totalCursos: 8,
            totalInscripciones: 342
        });
    }, []);

    return (
        <>
            <h2 className="fw-bold mb-4">Panel de Administración</h2>

            {/* Tarjetas de estadísticas */}
            <div className="row mb-4">
                <div className="col-md-4 mb-3">
                    <div className="card bg-primary text-white h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h4 className="mb-0">{stats.totalUsuarios}</h4>
                                    <p>Usuarios Registrados</p>
                                </div>
                                <div className="align-self-center">
                                    <i className="fa fa-users fa-2x"></i>
                                </div>
                            </div>
                            <Link to="/usuarios" className="btn btn-sm btn-light mt-2">Gestionar</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card bg-success text-white h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h4 className="mb-0">{stats.totalCursos}</h4>
                                    <p>Cursos Activos</p>
                                </div>
                                <div className="align-self-center">
                                    <i className="fa fa-book fa-2x"></i>
                                </div>
                            </div>
                            <Link to="/cursos" className="btn btn-sm btn-light mt-2">Gestionar</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card bg-info text-white h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h4 className="mb-0">{stats.totalInscripciones}</h4>
                                    <p>Total Inscripciones</p>
                                </div>
                                <div className="align-self-center">
                                    <i className="fa fa-graduation-cap fa-2x"></i>
                                </div>
                            </div>
                            <Link to="/inscripciones" className="btn btn-sm btn-light mt-2">Ver Detalles</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="p-3 rounded" style={{ background: "#2b2c34" }}>
                        <h5 className="mb-3">Novedades</h5>
                        <Reloj />
                        <div className="mt-3">
                            <Weather />
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="p-3 rounded" style={{ background: "#2b2c34" }}>
                        <h5 className="mb-3">Tus Accesos</h5>
                        <Contador reset={false} />
                    </div>
                </div>
            </div>
        </>
    );
};