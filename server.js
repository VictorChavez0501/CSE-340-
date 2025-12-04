const express = require("express")
const env = require("dotenv").config()
const app = express()
const path = require("path")

// View engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Static files
app.use(express.static(path.join(__dirname, "public")))

// Routes
app.get("/", (req, res) => {
  res.render("index")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

const invRoute = require("./routes/inventory-route");
app.use("/inv", invRoute);

app.use(async (err, req, res, next) => {
  console.error(err);
  let nav = await utilities.getNav();
  res.status(500).render("errors/error", {
    title: "Error",
    message: "Something went wrong",
    nav
  });
});
