import { useState } from "react";
import API from "../api/axiosConfig";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="bg-green-50 border border-green-300 text-green-800 px-4 py-3 rounded-lg text-center font-medium">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg text-center">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Fecha de la reserva
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={today}
          required
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-padel-primary focus:ring-4 focus:ring-green-500 focus:ring-opacity-20 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Hora disponible
        </label>
        <select
          value={hour}
          onChange={(e) => setHour(e.target.value)}
          required
          disabled={loading || availableTimes.length === 0}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-padel-primary focus:ring-4 focus:ring-green-500 focus:ring-opacity-20 transition"
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

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Duración (horas)
        </label>
        <select
          value={duracion}
          onChange={(e) => setDuracion(Number(e.target.value))}
          required
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-padel-primary focus:ring-4 focus:ring-green-500 focus:ring-opacity-20 transition"
        >
          <option value={1}>1 hora</option>
          <option value={2}>2 horas</option>
          <option value={3}>3 horas</option>
        </select>
      </div>

      {precioHora > 0 && (
        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">
              Precio Total:
            </span>
            <span className="text-3xl font-bold text-indigo-600">
              {total.toFixed(2)}€
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {precioHora}€/hora × {duracion} hora{duracion > 1 ? "s" : ""}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !date || !hour}
        className="w-full bg-padel-primary text-white font-bold py-4 rounded-lg hover:bg-padel-secondary transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Reservando..." : "Confirmar Reserva"}
      </button>
    </form>
  );
}
