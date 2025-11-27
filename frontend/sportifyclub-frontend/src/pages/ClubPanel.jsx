import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/axiosConfig";

export default function ClubPanel() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        const res = await API.get("/pistas/estadisticas");
        setStats([
          {
            label: "Pistas activas",
            value: res.data.pistasActivas,
            color: "text-blue-600",
          },
          {
            label: "Reservas hoy",
            value: res.data.reservasHoy,
            color: "text-green-600",
          },
          {
            label: "Ingresos mes",
            value: `€${res.data.ingresosMes}`,
            color: "text-purple-600",
          },
          {
            label: "Valoración",
            value: res.data.valoracion,
            color: "text-yellow-600",
          },
        ]);
        setError("");
      } catch (err) {
        setError("No se pudieron cargar las estadísticas");
        setStats([
          { label: "Pistas activas", value: "0", color: "text-blue-600" },
          { label: "Reservas hoy", value: "0", color: "text-green-600" },
          { label: "Ingresos mes", value: "€0", color: "text-purple-600" },
          { label: "Valoración", value: "0.0", color: "text-yellow-600" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    cargarEstadisticas();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full mb-4"></div>
          <p className="text-xl text-gray-700">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-indigo-700 mb-4">
            Panel del Club
          </h1>
          <p className="text-xl text-gray-700">
            ¡Hola, {user?.name || user?.email}! Gestiona tu club como un pro
          </p>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats &&
            stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300"
              >
                <p className="text-5xl font-bold text-gray-800 mb-2">
                  {stat.value}
                </p>
                <p className={`text-lg font-medium ${stat.color}`}>
                  {stat.label}
                </p>
              </div>
            ))}
        </div>

        {/* Acciones rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            to="/admin/pistas"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl p-10 text-center shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <p className="text-6xl mb-4">🎾</p>
            <h3 className="text-2xl font-bold">Gestionar Pistas</h3>
            <p className="mt-3 opacity-90">Añadir, editar o eliminar pistas</p>
          </Link>

          <Link
            to="/admin/reservas"
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-10 text-center shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <p className="text-6xl mb-4">📅</p>
            <h3 className="text-2xl font-bold">Ver Reservas</h3>
            <p className="mt-3 opacity-90">Control total de horarios</p>
          </Link>

          <Link
            to="/perfil"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-10 text-center shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <p className="text-6xl mb-4">📊</p>
            <h3 className="text-2xl font-bold">Estadísticas</h3>
            <p className="mt-3 opacity-90">Ingresos y ocupación</p>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-600">
            ¿Necesitas ayuda? Contacta con soporte en{" "}
            <span className="font-bold text-indigo-600">
              soporte@sportifyclub.com
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
