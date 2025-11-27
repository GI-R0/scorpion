import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const adminMenus = [
    {
      title: "Usuarios",
      description: "Ver, editar y gestionar cuentas",
      icon: "Personas",
      path: "/admin/users",
    },
    {
      title: "Pistas",
      description: "Crear, modificar y eliminar pistas",
      icon: "Tenis",
      path: "/admin/pistas",
    },
    {
      title: "Reservas",
      description: "Control total de reservas activas",
      icon: "Calendario",
      path: "/admin/reservas",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-indigo-700 mb-4">
            Panel de Administración
          </h1>
          <p className="text-xl text-gray-600">
            Bienvenido,{" "}
            <span className="font-bold text-indigo-600">
              {user?.name || user?.nombre || user?.email || "Admin"}
            </span>
            . Tienes control total del sistema.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adminMenus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-indigo-500 p-10 text-center transform hover:-translate-y-2"
            >
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">
                {menu.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {menu.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {menu.description}
              </p>
              <span className="inline-block mt-4 text-indigo-600 font-medium group-hover:text-indigo-800">
                Ir al módulo →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center space-x-6">
          <Link
            to="/perfil"
            className="inline-block px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
          >
            Volver al perfil
          </Link>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="inline-block px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-3xl font-bold text-indigo-600">127</p>
            <p className="text-gray-600">Usuarios</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-3xl font-bold text-green-600">89</p>
            <p className="text-gray-600">Pistas</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-3xl font-bold text-blue-600">342</p>
            <p className="text-gray-600">Reservas hoy</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-3xl font-bold text-purple-600">€8.421</p>
            <p className="text-gray-600">Ingresos mes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
