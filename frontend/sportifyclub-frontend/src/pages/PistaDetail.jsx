import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import ReservaForm from "../components/ReservaForm";

export default function PistaDetail() {
  const { id } = useParams();
  const [pista, setPista] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarPista = async () => {
      try {
        const res = await API.get(`/pistas/${id}`);
        setPista(res.data);
        setError("");
      } catch (err) {
        setError("No se pudo cargar la pista");
        setPista(null);
      } finally {
        setLoading(false);
      }
    };

    cargarPista();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-20 text-center">
        <div className="animate-spin inline-block w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
        <p className="mt-4 text-gray-600">Cargando pista...</p>
      </div>
    );
  }

  if (error || !pista) {
    return (
      <div className="container py-20 text-center">
        <div className="bg-red-50 border border-red-300 rounded-lg p-8 max-w-md mx-auto">
          <h3 className="text-2xl font-bold text-red-800 mb-4">
            Pista no encontrada
          </h3>
          <p className="text-gray-700 mb-6">{error}</p>
          <Link
            to="/pistas"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            Volver a pistas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-5xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <img
          src={
            pista.imagen ||
            "https://via.placeholder.com/1200x600/4F46E5/ffffff?text=Pista+de+Padel"
          }
          alt={pista.nombre}
          className="w-full h-96 object-cover"
        />

        <div className="p-8 md:p-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {pista.nombre}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-10">
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-4xl">📍</p>
              <p className="text-2xl font-bold text-indigo-600">
                {pista.ubicacion}
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-4xl">💰</p>
              <p className="text-4xl font-bold text-green-600">
                {pista.precioHora}€/h
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-4xl">✅</p>
              <p className="text-2xl font-bold text-blue-600">Disponible</p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              Reservar esta pista
            </h2>
            <ReservaForm
              pistaId={pista._id}
              precioHora={pista.precioHora}
              availableTimes={pista.horariosDisponibles || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
