import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("ERROR: MONGODB_URI no está configurado en .env");
  process.exit(1);
}

try {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await mongoose.connection.close();
  process.exit(0);
} catch (err) {
  console.error("❌ Error conectando a MongoDB:", err.message || err);
  process.exit(1);
}
