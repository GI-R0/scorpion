import mongoose from "mongoose";

const pistaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    deporte: {
      type: String,
      enum: ["Pádel", "Tenis", "Fútbol", "Baloncesto", "Voleibol"],
      default: "Pádel",
    },
    precioHora: {
      type: Number,
      required: [true, "El precio por hora es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
      default: 10,
    },
    ubicacion: {
      type: String,
      trim: true,
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "La pista debe pertenecer a un club"],
      index: true, 
    },
    horariosDisponibles: {
      type: [String],
      required: [true, "Debe haber al menos un horario"],
      validate: {
        validator: (arr) => arr.every(h => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(h)),
        message: "Formato de hora inválido (HH:MM)",
      },
      default: [],
    },
    imagen: {
      type: String,
      default: "https://via.placeholder.com/600x300?text=Pista+Sin+Imagen",
    },
    iluminacion: {
      type: Boolean,
      default: false,
    },
    superficie: {
      type: String,
      enum: ["Césped", "Arcilla", "Cemento", "Hierba artificial", "Madera"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Pista", pistaSchema);