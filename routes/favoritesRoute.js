const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const favoritesController = require("../controllers/favoritesController");

router.post("/add/:inv_id", auth.checkLogin, favoritesController.addFavorite);
router.get("/remove/:inv_id", auth.checkLogin, favoritesController.removeFavorite);
router.get("/", auth.checkLogin, favoritesController.viewFavorites);

module.exports = router;
