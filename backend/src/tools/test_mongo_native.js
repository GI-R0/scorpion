import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!uri) {
  console.error("ERROR: No se encontró MONGODB_URI ni MONGO_URI en .env");
  console.error("Ejemplo de URI (no uses credenciales reales aquí):");
  console.error(
    "mongodb+srv://<user>:<password>@cluster0.xxxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority"
  );
  process.exit(1);
}

const safeUri = uri.replace(/:(.*?)@/, ":****@");

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
  } catch (err) {
    console.error("❌ Error conectando a MongoDB:");
    console.error(err && err.stack ? err.stack : err);
    process.exit(1);
  } finally {
    try {
      await client.close();
    } catch (closeErr) {}
  }
}

run();
