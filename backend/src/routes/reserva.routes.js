import { Router } from "express";
import {
  getReservas,
  getReservaById,
  createReserva,
  updateReserva,
  deleteReserva,
  getMisReservas,
} from "../controllers/reserva.controller.js";
import { protect, authorize } from "../middlewares/auth.js";

const router = Router();

router.get("/", protect, authorize("admin"), getReservas);
router.get("/mis-reservas", protect, getMisReservas);
router.get("/:id", protect, getReservaById);
router.post("/", protect, createReserva);

router.route("/:id").put(protect, updateReserva).delete(protect, deleteReserva);

export default router;
