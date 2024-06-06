/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
const express = require("express");
const Tour = require("../Models/Tour");
const toursRouter = new express.Router();

toursRouter.get("/", async (req, res, next) => {
  try {
    const tours = await Tour.getByFilter(req.query);
    return res.json({ tours });
  } catch (e) {
    return next(e);
  }
});

module.exports = toursRouter;
