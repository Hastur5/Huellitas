const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getMyData,
  } = require("../controllers/user.controller");
  const { protect } = require("../middleware/authMiddleware");
  
  router.post("/", registerUser);
  router.post("/login", loginUser);
  router.get("/myData", protect, getMyData);

module.exports = router;
