import React, { useState, useEffect } from "react";
import API from "../api/axiosConfig";
import { useAuth } from "../hooks/useAuth";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Check,
  MapPin,
  DollarSign,
  Activity,
} from "lucide-react";

export default function GestionPistas() {
  const { user } = useAuth();
  const [pistas, setPistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPista, setEditingPista] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    deporte: "Pádel",
    precioHora: 10,
    ubicacion: "",
    horariosDisponibles:
      "09:00, 10:00, 11:00, 12:00, 16:00, 17:00, 18:00, 19:00, 20:00, 21:00",
    imagen: "",
    iluminacion: false,
    superficie: "Césped",
  });

  useEffect(() => {
    fetchPistas();
  }, []);

  const fetchPistas = async () => {
    try {
      setLoading(true);
      let url = "/pistas";
      if (user && user.role === "club") {
        url = `/pistas/club/${user._id}`;
      }

      const res = await API.get(url);
      setPistas(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching pistas:", err);
      setError("No se pudieron cargar las pistas.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openModal = (pista = null) => {
    if (pista) {
      setEditingPista(pista);
      setFormData({
        ...pista,
        horariosDisponibles: pista.horariosDisponibles.join(", "),
      });
    } else {
      setEditingPista(null);
      setFormData({
        nombre: "",
        deporte: "Pádel",
        precioHora: 10,
        ubicacion: "",
        horariosDisponibles:
          "09:00, 10:00, 11:00, 12:00, 16:00, 17:00, 18:00, 19:00, 20:00, 21:00",
        imagen: "",
        iluminacion: false,
        superficie: "Césped",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPista(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        horariosDisponibles: formData.horariosDisponibles
          .split(",")
          .map((h) => h.trim())
          .filter((h) => h),
      };

      if (editingPista) {
        await API.put(`/pistas/${editingPista._id}`, payload);
      } else {
        await API.post("/pistas", payload);
      }

      closeModal();
      fetchPistas();
    } catch (err) {
      console.error("Error saving pista:", err);
      alert("Error al guardar la pista. Verifica los datos.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta pista?"))
      return;
    try {
      await API.delete(`/pistas/${id}`);
      fetchPistas();
    } catch (err) {
      console.error("Error deleting pista:", err);
      alert("Error al eliminar la pista.");
    }
  };

  if (loading)
    return (
      <div className="p-8 text-center text-gray-600">Cargando pistas...</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gestión de Pistas
            </h1>
            <p className="mt-2 text-gray-600">
              Administra tus instalaciones deportivas
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} />
            Nueva Pista
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pistas.map((pista) => (
            <div
              key={pista._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={
                    pista.imagen ||
                    "https://via.placeholder.com/600x300?text=Pista"
                  }
                  alt={pista.nombre}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-indigo-600">
                  {pista.deporte}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {pista.nombre}
                </h3>

                <div className="space-y-2 text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span className="text-sm">
                      {pista.ubicacion || "Sin ubicación"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} />
                    <span className="text-sm">{pista.precioHora}€ / hora</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity size={16} />
                    <span className="text-sm">{pista.superficie}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => openModal(pista)}
                    className="flex-1 flex items-center justify-center gap-2 text-indigo-600 bg-indigo-50 py-2 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    <Edit size={18} />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(pista._id)}
                    className="flex-1 flex items-center justify-center gap-2 text-red-600 bg-red-50 py-2 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={18} />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {pistas.length === 0 && !loading && !error && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">
              No hay pistas registradas aún.
            </p>
            <button
              onClick={() => openModal()}
              className="mt-4 text-indigo-600 font-medium hover:text-indigo-800"
            >
              Crear la primera pista
            </button>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingPista ? "Editar Pista" : "Nueva Pista"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      placeholder="Ej: Pista Central"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deporte
                    </label>
                    <select
                      name="deporte"
                      value={formData.deporte}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    >
                      <option value="Pádel">Pádel</option>
                      <option value="Tenis">Tenis</option>
                      <option value="Fútbol">Fútbol</option>
                      <option value="Baloncesto">Baloncesto</option>
                      <option value="Voleibol">Voleibol</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Precio / Hora (€)
                    </label>
                    <input
                      type="number"
                      name="precioHora"
                      value={formData.precioHora}
                      onChange={handleInputChange}
                      min="0"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Superficie
                    </label>
                    <select
                      name="superficie"
                      value={formData.superficie}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    >
                      <option value="Césped">Césped</option>
                      <option value="Arcilla">Arcilla</option>
                      <option value="Cemento">Cemento</option>
                      <option value="Hierba artificial">
                        Hierba artificial
                      </option>
                      <option value="Madera">Madera</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ubicación
                    </label>
                    <input
                      type="text"
                      name="ubicacion"
                      value={formData.ubicacion}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      placeholder="Ej: Zona Norte, Pista 3"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL de Imagen
                    </label>
                    <input
                      type="text"
                      name="imagen"
                      value={formData.imagen}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Horarios Disponibles (separados por coma)
                    </label>
                    <textarea
                      name="horariosDisponibles"
                      value={formData.horariosDisponibles}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      placeholder="09:00, 10:00, 11:00..."
                    />
                    <p className="text-xs text-gray-500 mt-1">Formato HH:MM</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="iluminacion"
                      checked={formData.iluminacion}
                      onChange={handleInputChange}
                      id="iluminacion"
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="iluminacion"
                      className="text-sm font-medium text-gray-700"
                    >
                      Tiene Iluminación
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center gap-2"
                  >
                    <Check size={20} />
                    {editingPista ? "Guardar Cambios" : "Crear Pista"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
