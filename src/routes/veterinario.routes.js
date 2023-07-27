const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  registerVeterinario,
  loginVeterinario,
  getMyDataVet,
} = require("../controllers/veterinario.controller");

router.post("/", registerVeterinario);
router.post("/login", loginVeterinario);
router.get("/myDataVet", protect, getMyDataVet);

module.exports = router;
