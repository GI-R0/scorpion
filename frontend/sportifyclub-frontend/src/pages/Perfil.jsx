import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 text-center max-w-md">
          <div className="text-6xl mb-6">Lock</div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Acceso requerido
          </h3>
          <p className="text-gray-600 mb-8">
            Debes iniciar sesión para ver tu perfil.
          </p>
          <Link
            to="/login"
            className="inline-block w-full bg-indigo-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300"
          >
            Ir al Login
          </Link>
        </div>
      </div>
    );
  }

  const roleConfig = {
    admin: { label: "Administrador", color: "bg-red-600", icon: "👑" },
    club: { label: "Club", color: "bg-blue-600", icon: "🏢" },
    user: { label: "Usuario", color: "bg-green-600", icon: "👤" },
  };

  const config = roleConfig[user.role] || roleConfig.user;
  const { label, color, icon } = config;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header bonito */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-10 py-12 text-white text-center">
            <div className="text-8xl mb-4">{icon}</div>
            <h1 className="text-5xl font-bold mb-3">Mi Perfil</h1>
            <p className="text-xl opacity-90">
              ¡Hola de nuevo, {user.name || user.nombre || user.email}!
            </p>
          </div>

          <div className="p-10">
            {/* Info del usuario */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Nombre completo
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {user.name || user.nombre || "No especificado"}
                </p>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Email
                </p>
                <p className="text-xl text-gray-700 break-all">{user.email}</p>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Rol en la plataforma
                </p>
                <span
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-lg ${color}`}
                >
                  {icon} {label}
                </span>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                  ID de usuario
                </p>
                <p className="font-mono text-sm bg-gray-100 text-gray-700 px-4 py-3 rounded-lg break-all">
                  {user._id || user.id}
                </p>
              </div>
            </div>

            {/* Botones según rol */}
            <div className="border-t-2 border-gray-200 pt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold text-lg py-5 rounded-xl hover:from-red-700 hover:to-pink-700 transform hover:scale-105 transition-all shadow-lg"
                  >
                    Panel de Administración
                  </Link>
                )}

                {user.role === "club" && (
                  <Link
                    to="/club"
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg py-5 rounded-xl hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all shadow-lg"
                  >
                    Gestión de mi Club
                  </Link>
                )}

                <Link
                  to="/mis-reservas"
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg py-5 rounded-xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all shadow-lg"
                >
                  Mis Reservas
                </Link>

                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold text-lg py-5 rounded-xl hover:from-gray-800 hover:to-black transform hover:scale-105 transition-all shadow-lg"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-10">
          SportifyClub © 2025 • Tu plataforma de reservas deportivas
        </p>
      </div>
    </div>
  );
}
