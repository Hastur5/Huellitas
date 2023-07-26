const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
} = require("../controllers/clinica.controller");

router.route("/").get(protect, ).post(protect, );
router.route("/:id").put(protect, ).delete(protect, );

module.exports = router;