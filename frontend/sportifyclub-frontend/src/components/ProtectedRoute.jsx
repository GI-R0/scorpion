import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children, requireRole }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading-container-centered">
        <div className="loading-spinner"></div>
        <p className="loading-text">Comprobando sesión...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireRole && user.role !== requireRole) {
    return (
      <div className="access-denied-container-centered">
        <h3>Acceso denegado</h3>
        <p>No tienes permisos para ver esta página.</p>
      </div>
    );
  }

  return children;
}
