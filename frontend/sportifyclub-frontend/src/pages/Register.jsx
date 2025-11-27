import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axiosConfig";

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmarPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmarPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (!formData.nombre || !formData.email) {
      setError("Completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      await API.post("/auth/register", {
        name: formData.nombre.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      });

      navigate("/login", { 
        state: { message: "¡Cuenta creada con éxito! Ya puedes iniciar sesión." } 
      });
    } catch (err) {
      const mensaje = err.response?.data?.msg || "Error al crear la cuenta";
      setError(mensaje);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-10 text-center">
            <h1 className="text-4xl font-bold text-white">SportifyClub</h1>
            <p className="text-indigo-100 mt-2">Únete a la comunidad</p>
          </div>

          <div className="px-8 pb-10 pt-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Crear Cuenta
            </h2>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-20 focus:border-indigo-500 transition-all placeholder-gray-400"
                  placeholder="Juan Pérez"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-20 focus:border-indigo-500 transition-all placeholder-gray-400"
                  placeholder="tucorreo@ejemplo.com"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-20 focus:border-indigo-500 transition-all placeholder-gray-400"
                  placeholder="Mínimo 6 caracteres"
                  required
                  minLength="6"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  name="confirmarPassword"
                  value={formData.confirmarPassword}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-20 focus:border-indigo-500 transition-all placeholder-gray-400"
                  placeholder="Repite tu contraseña"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Creando cuenta...
                  </span>
                ) : (
                  "Crear mi cuenta gratis"
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <Link
                  to="/login"
                  className="font-bold text-indigo-600 hover:text-indigo-800 underline-offset-4 hover:underline transition"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          © 2025 SportifyClub • Reserva tu pista en segundos
        </p>
      </div>
    </div>
  );
}