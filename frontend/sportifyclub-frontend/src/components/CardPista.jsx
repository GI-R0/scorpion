import { Link } from "react-router-dom";

export default function CardPista({ pista }) {
  const defaultImages = {
    pádel:
      "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800&q=80",
    tenis:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
    "fútbol 5":
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80",
    fútbol:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    baloncesto:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
    voleibol:
      "https://images.unsplash.com/photo-1592656094267-764a45160876?w=800&q=80",
    default:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
  };

  const getImageUrl = () => {
    if (pista.imagen) return pista.imagen;
    const deporte = (pista.deporte || "").toLowerCase();
    return defaultImages[deporte] || defaultImages.default;
  };

  const isAvailable =
    Array.isArray(pista.horariosDisponibles) &&
    pista.horariosDisponibles.length > 0;

  return (
    <Link
      to={`/pistas/${pista._id}`}
      className="card hover:shadow-lg transition-all"
    >
      <div className="relative overflow-hidden">
        <img
          src={getImageUrl()}
          alt={pista.nombre}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-60 transition-opacity"></div>

        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded text-sm font-semibold text-white ${
              isAvailable ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {isAvailable ? "✓ Disponible" : "✗ Ocupada"}
          </span>
        </div>

        <div className="absolute top-3 left-3 bg-white rounded-lg px-2 py-1 text-xs font-bold text-padel-primary">
          🎾 {pista.deporte || "Pádel"}
        </div>
      </div>

      <div className="card-content">
        <h3 className="text-lg font-bold text-gray-900 mb-3">{pista.nombre}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>
              {pista.iluminacion ? "💡 Iluminación LED" : "☀️ Luz natural"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>🏗️ {pista.superficie || "Césped artificial"}</span>
          </div>
          {pista.ubicacion && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>📍 {pista.ubicacion}</span>
            </div>
          )}
        </div>

        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-2xl font-bold text-padel-primary">
            {pista.precioHora}
          </span>
          <span className="text-gray-600">€/hora</span>
        </div>

        <button className="w-full bg-padel-primary text-white py-2 rounded font-semibold hover:bg-padel-secondary transition-colors">
          Reservar →
        </button>
      </div>
    </Link>
  );
}
