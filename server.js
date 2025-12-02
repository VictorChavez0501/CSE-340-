/* ******************************************
 * Primary server file
 *******************************************/
const express = require("express")
const env = require("dotenv").config()
const path = require("path")
const app = express()

/* ***************
 * View Engine
 *****************/
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

/* ***************
 * Public folder
 *****************/
app.use(express.static("public"))

/* ***************
 * Routes
 *****************/
const staticRoutes = require("./routes/static")
app.use(staticRoutes)

// Home route (required for Assignment 1)
app.get("/", (req, res) => {
  res.render("index")   // Render views/index.ejs
})

/* ***************
 * Server startup
 *****************/
const port = process.env.PORT
const host = process.env.HOST

app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`)
})

