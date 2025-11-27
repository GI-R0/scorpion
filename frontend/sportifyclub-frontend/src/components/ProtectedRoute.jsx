import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children, requireRole }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <div className="loading-spinner" style={{ margin: "0 auto" }}></div>
        <p className="loading-text">Comprobando sesión...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireRole && user.role !== requireRole) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h3>Acceso denegado</h3>
        <p>No tienes permisos para ver esta página.</p>
      </div>
    );
  }

  return children;
}
