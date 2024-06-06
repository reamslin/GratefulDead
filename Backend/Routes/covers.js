/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
const express = require("express");
const Song = require("../Models/Song");
const coversRouter = new express.Router();

coversRouter.get("/", async (req, res, next) => {
  try {
    const covers = await Song.getCoversByFilter(req.query);
    return res.json({ covers });
  } catch (e) {
    return next(e);
  }
});

module.exports = coversRouter;
