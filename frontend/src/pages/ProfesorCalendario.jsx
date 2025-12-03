import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ProfesorCalendario.css";

const ProfesorCalendario = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", type: "" });

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleInputChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.description && newEvent.type) {
      const eventDate = date.toLocaleDateString();
      const newEventData = { ...newEvent, date: eventDate };
      setEvents((prevEvents) => [...prevEvents, newEventData]);
      setNewEvent({ title: "", description: "", type: "" });
    } else {
      alert("Please fill all fields.");
    }
  };

  const handleDeleteEvent = (eventIndex) => {
    setEvents((prevEvents) => prevEvents.filter((_, index) => index !== eventIndex));
  };

  return (
    <div className="profesor-calendario">
      <div className="container">
        <h2 className="calendar-header">Calendario Tareas</h2>
        <div className="calendar-container">
          <div className="calendar-box">
            <Calendar onChange={handleDateChange} value={date} className="calendar" />
          </div>

          <div className="events-box">
            <h3>Agenda</h3>
            <div className="event-form">
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                placeholder="Título"
                className="event-input"
              />
              <input
                type="text"
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                placeholder="Descripción"
                className="event-input"
              />
              <select
                name="type"
                value={newEvent.type}
                onChange={handleInputChange}
                className="event-select"
              >
                <option value="">Tipo de actividad</option>
                <option value="Examen">Examen</option>
                <option value="Tarea">Tarea</option>
                <option value="Otro">Otro</option>
              </select>
              <button className="btn-add-event" onClick={handleAddEvent}>
                Agregar Actividad
              </button>
            </div>

            <ul className="event-list">
              {events.map((event, index) => (
                <li key={index} className="event-item">
                  <strong>{event.date}</strong> - {event.title} - {event.type}
                  <p>{event.description}</p>
                  <button
                    onClick={() => handleDeleteEvent(index)}
                    className="btn-delete-event"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfesorCalendario;
