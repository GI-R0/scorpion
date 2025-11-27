import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import pistaRoutes from "./routes/pista.routes.js";
import reservaRoutes from "./routes/reserva.routes.js";
import authRoutes from "./routes/auth.routes.js";

import uploadRoutes from "./routes/upload.routes.js";

dotenv.config();

try {
  await connectDB();
} catch (err) {
  console.error("No se pudo conectar a la base de datos. Abortando arranque.");
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use("/api/pistas", pistaRoutes);
app.use("/api/reservas", reservaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Servidor SportifyClub funcionando 🏆");
});

app.get("/health", (req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || "development" });
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";
app.listen(PORT, HOST, () =>
  console.log(`🚀 Servidor corriendo en ${HOST}:${PORT}`)
);

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

app.use((err, req, res, next) => {
  console.error("Error:", err?.message || String(err));
  if (res.headersSent) return next(err);
  res
    .status(500)
    .json({ msg: "Internal server error", error: err?.message || String(err) });
});
