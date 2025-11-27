import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useState } from "react";

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-indigo-700 mb-4">
            Mis Reservas
          </h1>
          <p className="text-xl text-gray-600">
            ¡Hola, {user?.name || user?.email}! Aquí tienes todas tus reservas
          </p>
        </div>

        {reservas.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <p className="text-6xl mb-6">Tennis Ball</p>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Aún no tienes reservas
            </h3>
            <p className="text-gray-600 mb-8">
              ¡Es hora de reservar tu primera pista!
            </p>
            <Link
              to="/pistas"
              className="inline-block bg-indigo-600 text-white font-bold text-xl px-10 py-4 rounded-xl hover:bg-indigo-700 transform hover:scale-105 transition-all shadow-lg"
            >
              Buscar pistas
            </Link>
          </div>
        ) : (
          <div className="grid gap-8">
            {reservas.map((reserva) => (
              <div
                key={reserva.id}
                className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row justify-between items-center gap-6 border border-gray-100"
              >
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {reserva.pista}
                  </h3>
                  <p className="text-lg text-gray-600 mt-2">
                    Reserva #{reserva.id}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-3xl font-bold text-indigo-600">
                    {reserva.fecha}
                  </p>
                  <p className="text-xl text-gray-700">{reserva.hora}</p>
                </div>

                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {reserva.precio}
                  </p>
                  <span
                    className={`inline-block mt-3 px-6 py-2 rounded-full text-white font-bold ${
                      reserva.estado === "Confirmada"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {reserva.estado}
                  </span>
                </div>

                <button className="bg-gray-200 text-gray-800 font-bold px-8 py-4 rounded-xl hover:bg-gray-300 transition">
                  Ver detalles
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
