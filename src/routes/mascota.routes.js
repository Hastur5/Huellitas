const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getMascotas,
  setMascotas,
  updateMascotas,
  deleteMascotas,
} = require("../controllers/mascota.controller");

router.route("/").get(protect, getMascotas).post(protect, setMascotas);
router.route("/:id").put(protect, updateMascotas).delete(protect, deleteMascotas);

module.exports = router;