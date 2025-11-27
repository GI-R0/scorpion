import { Router } from "express";
import {
  getPistas,
  getPistaById,
  createPista,
  updatePista,
  deletePista,
  getPistasByClub,
  getEstadisticasClub,
} from "../controllers/pista.controller.js";
import { protect, authorize } from "../middlewares/auth.js";

const router = Router();

router.get("/", getPistas);
router.get("/club/:clubId", protect, getPistasByClub);
router.get(
  "/estadisticas",
  protect,
  authorize("club", "admin"),
  getEstadisticasClub
);
router.get("/:id", getPistaById);

router.post("/", protect, authorize("club", "admin"), createPista);
router.put("/:id", protect, authorize("club", "admin"), updatePista);
router.delete("/:id", protect, authorize("club", "admin"), deletePista);

export default router;
