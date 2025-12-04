import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/MisReservas.css";

export default function MisReservas() {
  const { user } = useAuth();

  const [reservas] = useState([
    {
      id: "R001",
      pista: "Pista 1 - Club Central",
      fecha: "22 dic 2025",
      hora: "18:00 - 19:30",
      precio: "28€",
      estado: "Confirmada",
    },
    {
      id: "R002",
      pista: "Pista VIP - Sport Elite",
      fecha: "25 dic 2025",
      hora: "10:00 - 11:30",
      precio: "35€",
      estado: "Pendiente",
    },
  ]);

  return (
    <div className="mis-reservas-page">
      <div className="mis-reservas-container">
        <div className="reservas-header">
          <h1 className="reservas-title">Mis Reservas</h1>
          <p className="reservas-subtitle">
            ¡Hola, {user?.name || user?.email}! Aquí tienes todas tus reservas
          </p>
        </div>

        {reservas.length === 0 ? (
          <div className="reservas-empty">
            <p className="empty-icon">🎾</p>
            <h3 className="empty-title">Aún no tienes reservas</h3>
            <p className="empty-desc">¡Es hora de reservar tu primera pista!</p>
            <Link to="/pistas" className="btn-search">
              Buscar pistas
            </Link>
          </div>
        ) : (
          <div className="reservas-grid">
            {reservas.map((reserva) => (
              <div key={reserva.id} className="reserva-card">
                <div className="reserva-info">
                  <h3>{reserva.pista}</h3>
                  <p className="reserva-id">Reserva #{reserva.id}</p>
                </div>

                <div className="reserva-time">
                  <p className="reserva-date">{reserva.fecha}</p>
                  <p className="reserva-hours">{reserva.hora}</p>
                </div>

                <div className="reserva-status">
                  <p className="reserva-price">{reserva.precio}</p>
                  <span
                    className={`status-badge ${
                      reserva.estado === "Confirmada" ? "confirmed" : "pending"
                    }`}
                  >
                    {reserva.estado}
                  </span>
                </div>

                <button className="btn-details">Ver detalles</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
