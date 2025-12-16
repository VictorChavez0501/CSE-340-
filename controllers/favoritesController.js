const favoritesModel = require("../models/favorites-model");
const utilities = require("../utilities");

async function addFavorite(req, res) {
  const account_id = req.session.account.account_id;
  const inv_id = req.params.inv_id;

  await favoritesModel.addFavorite(account_id, inv_id);
  req.flash("notice", "⭐ Vehicle added to favorites!");
  res.redirect("back");
}

async function removeFavorite(req, res) {
  const account_id = req.session.account.account_id;
  const inv_id = req.params.inv_id;

  await favoritesModel.removeFavorite(account_id, inv_id);
  req.flash("notice", "❌ Vehicle removed from favorites.");
  res.redirect("/account/favorites");
}

async function viewFavorites(req, res) {
  const nav = await utilities.getNav();
  const account_id = req.session.account.account_id;

  const favorites = await favoritesModel.getFavoritesByAccount(account_id);

  res.render("account/favorites", {
    title: "My Favorite Vehicles",
    nav,
    favorites: favorites.rows,
  });
}

module.exports = {
  addFavorite,
  removeFavorite,
  viewFavorites,
};
