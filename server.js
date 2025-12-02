/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const homeRoute = require("./routes/home")   // ➜ NUEVO

/* ***********************
 * View Engine
 *************************/
app.set("view engine", "ejs")
app.set("views", "./views")

/* ***********************
 * Routes
 *************************/
app.use(static)
app.use("/", homeRoute)   // ➜ NUEVO: esto sirve el home

/* ***********************
 * Port & Host
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Start Server
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})

