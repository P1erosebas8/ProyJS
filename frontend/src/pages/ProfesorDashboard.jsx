import React from "react";
import { useNavigate } from "react-router-dom";

export const ProfesorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2 className="text-center mb-4" style={{ color: "#17b6ffff" }}>
        Bienvenido, Profesor
      </h2>

      <div className="row justify-content-center">
        {/* Tarjeta de Mis Cursos */}
        <div className="col-md-5 mb-4">
          <div className="card shadow-lg" style={{ backgroundColor: "#363742ff", color: "white" }}>
            <div className="card-body">
              <h4 className="card-title text-center">Mis Cursos</h4>
              <p className="card-text text-center">Gestiona y administra los cursos que estás enseñando</p>
              <button
                onClick={() => navigate('/profesor-cursos')}
                className="btn btn-success w-100"
              >
                Ver Mis Cursos
              </button>
            </div>
          </div>
        </div>

        {/* Tarjeta de Calendario */}
        <div className="col-md-5 mb-4">
          <div className="card shadow-lg" style={{ backgroundColor: "#363742ff", color: "white" }}>
            <div className="card-body">
              <h4 className="card-title text-center">Calendario</h4>
              <p className="card-text text-center">Gestiona las fechas de las tareas y actividades</p>
              <button
                onClick={() => navigate('/profesor-calendario')}
                className="btn btn-success w-100"
              >
                Ver Calendario
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
