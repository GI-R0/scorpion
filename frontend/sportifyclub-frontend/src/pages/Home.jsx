import { Link } from "react-router-dom";
import { Zap, MapPin, ShieldCheck, Clock } from "lucide-react";

export default function Home() {
  // Características principales con iconos reales para dar un toque más profesional
  const features = [
    {
      icon: <Zap className="w-12 h-12 text-indigo-600 mx-auto" />,
      title: "Reserva instantánea",
      desc: "Selecciona fecha, hora y pista al instante",
    },
    {
      icon: <MapPin className="w-12 h-12 text-indigo-600 mx-auto" />,
      title: "Pistas cerca de ti",
      desc: "Encuentra las mejores instalaciones en tu ciudad",
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-indigo-600 mx-auto" />,
      title: "100% Seguro",
      desc: "Pagos protegidos con encriptación SSL",
    },
    {
      icon: <Clock className="w-12 h-12 text-indigo-600 mx-auto" />,
      title: "Disponible 24/7",
      desc: "Reserva cualquier día, a cualquier hora",
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">SportifyClub</h1>
          <p className="text-xl md:text-3xl mb-10 opacity-90">
            Reserva pistas deportivas en minutos
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold">+120</div>
              <div className="text-lg opacity-80">Pistas disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold">24/7</div>
              <div className="text-lg opacity-80">Abierto siempre</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold">4.9 ★</div>
              <div className="text-lg opacity-80">Valoración usuarios</div>
            </div>
          </div>

          <Link
            to="/pistas"
            className="inline-block bg-white text-indigo-600 font-bold text-xl px-10 py-5 rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Ver todas las pistas
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              ¿Por qué elegir SportifyClub?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La plataforma más completa para reservar pistas de pádel, tenis,
              fútbol y más
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-gray-100"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para jugar?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Encuentra tu pista perfecta en menos de 1 minuto
          </p>
          <Link
            to="/pistas"
            className="inline-block bg-white text-indigo-600 font-bold text-xl px-12 py-5 rounded-full hover:bg-gray-100 transform hover:scale-110 transition-all duration-300 shadow-2xl"
          >
            Reservar ahora
          </Link>
        </div>
      </section>
    </>
  );
}
