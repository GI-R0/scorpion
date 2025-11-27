import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <Link to="/" className="navbar-brand text-2xl font-bold text-padel-primary">
          🎾 SportifyClub
        </Link>

        <div className="navbar-nav flex gap-6 items-center">
          <Link to="/" className="navbar-link text-gray-700 hover:text-padel-primary transition-colors">
            Inicio
          </Link>
          <Link to="/pistas" className="navbar-link text-gray-700 hover:text-padel-primary transition-colors">
            Pistas
          </Link>

          {user ? (
            <>
              <Link to="/perfil" className="navbar-link text-gray-700 hover:text-padel-primary transition-colors">
                👤 {user.name || user.email}
              </Link>
              {user.role === "admin" && (
                <Link to="/admin" className="navbar-link text-gray-700 hover:text-padel-primary transition-colors font-semibold">
                  ⚙️ Admin
                </Link>
              )}
              <button onClick={logout} className="btn btn-secondary px-4 py-2 text-sm">
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary px-4 py-2 text-sm">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="btn btn-primary px-4 py-2 text-sm">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}