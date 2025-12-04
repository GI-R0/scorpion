import { useState } from "react";
import API from "../api/axiosConfig";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/ReservaForm.css";

export default function ReservaForm({
  pistaId,
  precioHora = 0,
  availableTimes = [],
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [duracion, setDuracion] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("Tienes que iniciar sesión para reservar");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    const fechaSeleccionada = new Date(date);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < hoy) {
      setError("No puedes reservar en fechas pasadas");
      return;
    }

    if (!hour) {
      setError("Por favor selecciona una hora");
      return;
    }

    setLoading(true);

    try {
      await API.post("/reservas", {
        usuario: user._id,
        pista: pistaId,
        fecha: date,
        hora: hour,
        duracion: duracion,
      });

      setSuccess(
        `¡Reserva confirmada para el ${date} a las ${hour} h (${duracion}h)!`
      );
      setDate("");
      setHour("");
      setDuracion(1);
    } catch (err) {
      const mensaje =
        err.response?.data?.msg || "No se pudo completar la reserva";
      setError(mensaje);
    } finally {
      setLoading(false);
    }
  };

  const total = precioHora * duracion;

  return (
    <form onSubmit={handleSubmit} className="reserva-form">
      {success && <div className="reserva-success">{success}</div>}

      {error && <div className="reserva-error">{error}</div>}

      <div className="reserva-field">
        <label className="reserva-label">Fecha de la reserva</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={today}
          required
          disabled={loading}
          className="reserva-input"
        />
      </div>

      <div className="reserva-field">
        <label className="reserva-label">Hora disponible</label>
        <select
          value={hour}
          onChange={(e) => setHour(e.target.value)}
          required
          disabled={loading || availableTimes.length === 0}
          className="reserva-select"
        >
          <option value="">Selecciona una hora</option>
          {availableTimes.length === 0 ? (
            <option disabled>No hay horarios disponibles</option>
          ) : (
            availableTimes.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="reserva-field">
        <label className="reserva-label">Duración (horas)</label>
        <select
          value={duracion}
          onChange={(e) => setDuracion(Number(e.target.value))}
          required
          disabled={loading}
          className="reserva-select"
        >
          <option value={1}>1 hora</option>
          <option value={2}>2 horas</option>
          <option value={3}>3 horas</option>
        </select>
      </div>

      {precioHora > 0 && (
        <div className="reserva-summary">
          <div className="summary-row">
            <span className="summary-label">Precio Total:</span>
            <span className="summary-total">{total.toFixed(2)}€</span>
          </div>
          <p className="summary-detail">
            {precioHora}€/hora × {duracion} hora{duracion > 1 ? "s" : ""}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !date || !hour}
        className="btn-reservar"
      >
        {loading ? "Reservando..." : "Confirmar Reserva"}
      </button>
    </form>
  );
}
