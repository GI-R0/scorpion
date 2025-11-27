import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("ERROR: MONGODB_URI no está configurado en .env");
  process.exit(1);
}

console.log("Probando conexión a MongoDB con MONGODB_URI:", uri.replace(/:(.*)@/, ":****@"));

try {
  // Top-level await es válido en ESM (project usa "type": "module")
  await mongoose.connect(uri, {
    // Opciones recomendadas
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("✅ Conexión a MongoDB establecida correctamente.");
  await mongoose.connection.close();
  process.exit(0);
} catch (err) {
  console.error("❌ Error conectando a MongoDB:", err.message || err);
  process.exit(1);
}
