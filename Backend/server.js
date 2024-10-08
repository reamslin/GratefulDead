/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
const express = require("express");
const ExpressError = require("./Models/ExpressError");
const setlistsRouter = require("./Routes/setlists");
const songsRouter = require("./Routes/songs");
const venuesRouter = require("./Routes/venues");
const coversRouter = require("./Routes/covers");
const notesRouter = require("./Routes/notes");
const toursRouter = require("./Routes/tours");
const cors = require("cors");

const PORT = +process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/setlists", setlistsRouter);
app.use("/songs", songsRouter);
app.use("/venues", venuesRouter);
app.use("/covers", coversRouter);
app.use("/notes", notesRouter);
app.use("/tours", toursRouter);

app.get("/", (req, res, next) => {
  res.json("Ladies and Gentlemen, The Grateful Dead");
});

app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError);
});

app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(PORT, function () {
  console.log(`Running on port ${PORT}`);
});

module.exports = app;
