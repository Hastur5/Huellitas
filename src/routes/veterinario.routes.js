const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  registerVeterinario,
  loginVeterinario,
  getMyData,
} = require("../controllers/veterinario.controller");

router.post("/", registerVeterinario);
router.post("/loginVet", loginVeterinario);
router.get("/myDataVet", protect, getMyData);

module.exports = router;
