import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Acepta MONGODB_URI o MONGO_URI por compatibilidad
const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!uri) {
  console.error("ERROR: No se encontró MONGODB_URI ni MONGO_URI en .env");
  console.error("Ejemplo de URI (no uses credenciales reales aquí):");
  console.error(
    "mongodb+srv://<user>:<password>@cluster0.xxxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority"
  );
  process.exit(1);
}

// Mostrar la URI pero ocultando la contraseña para seguridad
const safeUri = uri.replace(/:(.*?)@/, ":****@");

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 10000,
  // retryWrites default está bien; no cambios
});

async function run() {
  try {
    // Intentamos conectar con un timeout razonable
    await client.connect();
    await client.db("admin").command({ ping: 1 });
  } catch (err) {
    console.error("❌ Error conectando a MongoDB:");
    // Mostrar stack si existe para facilitar debugging local
    console.error(err && err.stack ? err.stack : err);
    process.exit(1);
  } finally {
    try {
      await client.close();
    } catch (closeErr) {
      // ignora
    }
  }
}

run();
