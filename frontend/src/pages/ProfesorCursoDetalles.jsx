import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ProfesorCursoDetalles = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [weeks] = useState([1, 2, 3, 4, 5, 6]);
  const [comments, setComments] = useState([]);

  // Estados para almacenar los elementos creados
  const [uploadedMaterial, setUploadedMaterial] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [materialUploaded, setMaterialUploaded] = useState(false);
  const [createdTask, setCreatedTask] = useState(null);
  const [createdForum, setCreatedForum] = useState(null);

  useEffect(() => {
    const courseData = {
      1: { title: "Introducción a React", description: "Curso básico de React" },
      2: { title: "Node.js y Express", description: "Backend con Node.js y Express" },
      3: { title: "Bases de Datos Relacionales", description: "Fundamentos de bases de datos SQL" },
    };
    setCourse(courseData[courseId]);
  }, [courseId]);

  if (!course) return <p>Cargando...</p>;

  // Función para activar una sección
  const openSection = (section) => {
    setActiveSection(section);
    setMaterialUploaded(false); // Reiniciar material subido al cambiar de sección
  };

  // Función para manejar los comentarios en el foro
  const handleAddComment = (comment) => {
    setComments((prevComments) => [...prevComments, comment]);
  };

  // Función para manejar la subida de materiales
  const handleUploadMaterial = (e) => {
    const file = e.target.files[0];
    setUploadedMaterial(file); // Guardamos el archivo subido
  };

  // Función para manejar el envío del material
  const handleSubmit = (e) => {
    e.preventDefault();
    setMaterialUploaded(true); // Establecer el estado a true para mostrar el material subido
  };

  // Función para crear una tarea
  const handleCreateTask = (e) => {
    e.preventDefault();
    const task = {
      title: e.target.title.value,
      week: e.target.week.value,
      startDate: e.target.startDate.value,
      endDate: e.target.endDate.value,
      description: e.target.description.value,
    };
    setCreatedTask(task); // Guardamos la tarea creada
  };

  // Función para crear un foro
  const handleCreateForum = (e) => {
    e.preventDefault();
    const forum = {
      title: e.target.title.value,
      description: e.target.description.value,
    };
    setCreatedForum(forum); // Guardamos el foro creado
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4" style={{ color: "#4CAF50" }}>
        {course.title}
      </h2>
      <p>{course.description}</p>

      {/* Botones para gestionar el curso */}
      <div className="actions">
        <button className="btn btn-success" onClick={() => openSection("upload")}>
          Subir Materiales
        </button>
        <button className="btn btn-primary" onClick={() => openSection("task")}>
          Crear Tarea
        </button>
        <button className="btn btn-info" onClick={() => openSection("forum")}>
          Crear Foro
        </button>
      </div>

      {/* Formulario para subir material */}
      {activeSection === "upload" && (
        <form onSubmit={handleSubmit}>
          {/* Subir archivo PDF */}
          <div className="form-group">
            <label htmlFor="fileUpload">Sube un archivo PDF</label>
            <input
              id="fileUpload"
              type="file"
              accept=".pdf"
              className="form-control"
              onChange={handleUploadMaterial}
            />
          </div>

          {/* Selección de semana */}
          <div className="form-group">
            <label htmlFor="weekSelect">Selecciona la semana</label>
            <select
              id="weekSelect"
              className="form-control"
              onChange={(e) => setSelectedWeek(e.target.value)}
              value={selectedWeek}
            >
              <option value="">Selecciona una semana</option>
              {weeks.map((week) => (
                <option key={week} value={`Semana ${week}`}>
                  Semana {week}
                </option>
              ))}
            </select>
          </div>

          {/* Título del material */}
          <div className="form-group">
            <label htmlFor="materialTitle">Título del Material</label>
            <input
              id="materialTitle"
              type="text"
              className="form-control"
              placeholder="Introduce el título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Descripción del material */}
          <div className="form-group">
            <label htmlFor="materialDescription">Descripción</label>
            <textarea
              id="materialDescription"
              className="form-control"
              placeholder="Describe el material"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Subir Material
          </button>
        </form>
      )}


      {materialUploaded && uploadedMaterial && activeSection === "upload" && (
        <div className="uploaded-info mt-4">
          <h4>Material Subido:</h4>
          <div>
            <strong>Título:</strong> {title || "Sin título"}
          </div>
          <div>
            <strong>Descripción:</strong> {description || "Sin descripción"}
          </div>
          <div>
            <strong>Semana:</strong> {selectedWeek || "No seleccionada"}
          </div>
          <div>
            <strong>Archivo PDF:</strong>
            <p>{uploadedMaterial.name}</p>
            <embed
              src={URL.createObjectURL(uploadedMaterial)}
              type="application/pdf"
              width="100%"
              height="500px"
            />
          </div>
        </div>
      )}

      {activeSection === "task" && (
        <div className="section">
          <h3>Crear Tarea</h3>
          <form onSubmit={handleCreateTask}>
            <div className="form-group">
              <label htmlFor="taskTitle">Título de la Tarea</label>
              <input
                id="taskTitle"
                type="text"
                name="title"
                className="form-control"
                placeholder="Introduce el título"
              />
            </div>

            <div className="form-group">
              <label htmlFor="taskWeek">Semana</label>
              <select id="taskWeek" name="week" className="form-control">
                {weeks.map((week) => (
                  <option key={week} value={`Semana ${week}`}>
                    Semana {week}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="startDate">Fecha de Inicio</label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                className="form-control"
                placeholder="Fecha de inicio"
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">Fecha de Finalización</label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                className="form-control"
                placeholder="Fecha de finalización"
              />
            </div>

            <div className="form-group">
              <label htmlFor="taskDescription">Descripción</label>
              <textarea
                id="taskDescription"
                name="description"
                className="form-control"
                placeholder="Describe la tarea"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Crear Tarea
            </button>
          </form>

          {createdTask && (
            <div className="mt-4">
              <h4>Tarea Creada:</h4>
              <div>
                <strong>Título:</strong> {createdTask.title}
              </div>
              <div>
                <strong>Semana:</strong> {createdTask.week}
              </div>
              <div>
                <strong>Fecha de Inicio:</strong> {createdTask.startDate}
              </div>
              <div>
                <strong>Fecha de Finalización:</strong> {createdTask.endDate}
              </div>
              <div>
                <strong>Descripción:</strong> {createdTask.description}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sección para Crear Foro */}
      {activeSection === "forum" && (
        <div className="section">
          <h3>Crear Foro</h3>
          <form onSubmit={handleCreateForum}>
            <input type="text" name="title" placeholder="Título del foro" />
            <textarea name="description" placeholder="Descripción del foro" />
            <button className="btn btn-info">Crear Foro</button>
          </form>
          {createdForum && (
            <div>
              <h4>Foro Creado:</h4>
              <p>{createdForum.title}</p>
              <p>{createdForum.description}</p>
            </div>
          )}
          {/* Sección de comentarios */}
          <div className="comments-section">
            <h4>Comentarios:</h4>
            <textarea
              placeholder="Añadir comentario"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  handleAddComment(e.target.value);
                  e.target.value = "";
                }
              }}
              style={{ backgroundColor: "#ffffffff", color: "#0e0d0dff" }}
            />
            <div className="comments-list">
              {comments.map((comment, index) => (
                <p key={index} style={{ color: "#000000ff" }}>{comment}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};








