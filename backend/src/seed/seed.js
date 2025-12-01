import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import csv from "csv-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Pista from "../models/Pista.js";
import Reserva from "../models/Reserva.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const readCSV = (filename) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const filePath = path.join(__dirname, filename);
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (d) => results.push(d))
      .on("end", () => resolve(results))
      .on("error", (err) => {
        console.error(`Error leyendo ${filename}:`, err.message);
        reject(err);
      });
  });
};

const mongoUri =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/sportify";

const seed = async () => {
  try {
    await mongoose.connect(mongoUri);

    await User.deleteMany({});
    await Pista.deleteMany({});
    await Reserva.deleteMany({});

    const data = await readCSV("data.csv");

    const usersData = data.filter((d) => d.type === "user");
    const pistasData = data.filter((d) => d.type === "pista");
    const reservasData = data.filter((d) => d.type === "reserva");

    const usersToInsert = usersData.map((u) => ({
      name: u.name,
      email: u.email.toLowerCase(),
      password: u.password,
      role: u.role || "user",
    }));

    const users = [];
    for (const u of usersToInsert) {
      const newUser = await User.create(u);
      users.push(newUser);
    }

    const userMap = users.reduce((map, u) => {
      map[u.email] = u._id;
      return map;
    }, {});

    const pistasToInsert = pistasData.map((p) => {
      const clubId = userMap[p.email.toLowerCase()];
      if (!clubId) console.warn(`Club no encontrado para pista: ${p.name}`);

      return {
        nombre: p.name,
        deporte: p.deporte,
        precioHora: Number(p.precioHora) || 10,
        ubicacion: p.ubicacion || "Sede Principal",
        club: clubId,
        horariosDisponibles: [
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
        ],
        imagen:
          p.name === "Pista 2"
            ? "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80"
            : p.imagen || "",
        iluminacion: p.iluminacion === "true",
        superficie: p.superficie || "Césped",
      };
    });

    const pistas = await Pista.insertMany(pistasToInsert);

    const pistaMap = pistas.reduce((map, p) => {
      map[p.nombre] = p._id;
      return map;
    }, {});

    const reservasToInsert = reservasData
      .map((r) => {
        const userId = userMap[r.email.toLowerCase()];
        const pista = pistas.find((p) => p.deporte === r.deporte);

        if (!userId || !pista) {
          return null;
        }

        return {
          usuario: userId,
          pista: pista._id,
          fecha: new Date(r.fecha),
          hora: r.horaInicio,
          duracion: 1.5,
          total: Number(r.precioHora) || 20,
          estado: r.estado || "confirmada",
        };
      })
      .filter(Boolean);

    const reservas = await Reserva.insertMany(reservasToInsert);

    process.exit(0);
  } catch (err) {
    console.error("Error en seed:", err);
    process.exit(1);
  }
};

seed();
