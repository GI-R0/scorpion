import React, { useState, useEffect } from "react";
import API from "../api/axiosConfig";
import CardPista from "../components/CardPista";
import { Search, Filter } from "lucide-react";

export default function Pistas() {
  const [pistas, setPistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDeporte, setFilterDeporte] = useState("Todos");

  useEffect(() => {
    fetchPistas();
  }, []);

  const fetchPistas = async () => {
    try {
      setLoading(true);
      const res = await API.get("/pistas");
      setPistas(res.data);
    } catch (err) {
      console.error("Error fetching pistas:", err);
      setError("No se pudieron cargar las pistas. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const filteredPistas = pistas.filter((pista) => {
    const matchesSearch = pista.nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDeporte =
      filterDeporte === "Todos" || pista.deporte === filterDeporte;
    return matchesSearch && matchesDeporte;
  });

  const deportes = ["Todos", ...new Set(pistas.map((p) => p.deporte))];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Reserva tu Pista
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encuentra y reserva las mejores instalaciones deportivas de tu
            ciudad
          </p>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <Filter size={20} className="text-gray-400" />
            {deportes.map((deporte) => (
              <button
                key={deporte}
                onClick={() => setFilterDeporte(deporte)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  filterDeporte === deporte
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {deporte}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-2xl text-red-600">
            {error}
          </div>
        ) : filteredPistas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPistas.map((pista) => (
              <CardPista key={pista._id} pista={pista} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">
              No se encontraron pistas con esos criterios.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterDeporte("Todos");
              }}
              className="mt-4 text-indigo-600 font-medium hover:text-indigo-800"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
