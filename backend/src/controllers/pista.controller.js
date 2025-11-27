import Pista from "../models/Pista.js";
import Reserva from "../models/Reserva.js";
import { validationResult } from "express-validator";

export const getPistas = async (req, res) => {
  try {
    const pistas = await Pista.find().populate("club", "name email").lean();
    res.json(pistas);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error al obtener pistas", error: err.message });
  }
};

export const getPistaById = async (req, res) => {
  try {
    const pista = await Pista.findById(req.params.id)
      .populate("club", "name")
      .lean();
    if (!pista) return res.status(404).json({ msg: "Pista no encontrada" });
    res.json(pista);
  } catch (err) {
    res.status(500).json({ msg: "Error al buscar pista", error: err.message });
  }
};

export const getPistasByClub = async (req, res) => {
  try {
    const clubId = req.params.clubId;
    const pistas = await Pista.find({ club: clubId })
      .populate("club", "name email")
      .lean();
    res.json(pistas);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error al obtener pistas por club", error: err.message });
  }
};

export const getEstadisticasClub = async (req, res) => {
  try {
    const clubId = req.user._id;

    const pistasActivas = await Pista.countDocuments({ club: clubId });

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);

    const pistasList = await Pista.find({ club: clubId }).select("_id");
    const pistasIds = pistasList.map((p) => p._id);

    const reservasHoy = await Reserva.countDocuments({
      pista: { $in: pistasIds },
      fecha: { $gte: hoy, $lt: manana },
    });

    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const finMes = new Date(
      hoy.getFullYear(),
      hoy.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const reservasMes = await Reserva.find({
      pista: { $in: pistasIds },
      fecha: { $gte: inicioMes, $lte: finMes },
      estado: { $ne: "cancelada" },
    }).select("total");

    const ingresosMes = reservasMes.reduce((sum, r) => sum + (r.total || 0), 0);

    const valoracion = 4.8;

    res.json({
      pistasActivas,
      reservasHoy,
      ingresosMes: ingresosMes.toFixed(2),
      valoracion: valoracion.toFixed(1),
    });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error al obtener estadísticas", error: err.message });
  }
};

export const createPista = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const pista = new Pista({
      ...req.body,
      club: req.user._id,
    });
    const saved = await pista.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ msg: "Error al crear pista", error: err.message });
  }
};

export const updatePista = async (req, res) => {
  try {
    const pista = await Pista.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("club", "name")
      .lean();

    if (!pista) return res.status(404).json({ msg: "Pista no encontrada" });
    res.json(pista);
  } catch (err) {
    res
      .status(400)
      .json({ msg: "Error actualizando pista", error: err.message });
  }
};

export const deletePista = async (req, res) => {
  try {
    const pista = await Pista.findByIdAndDelete(req.params.id);
    if (!pista) return res.status(404).json({ msg: "Pista no encontrada" });
    res.json({ msg: "Pista eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ msg: "Error al eliminar", error: err.message });
  }
};
