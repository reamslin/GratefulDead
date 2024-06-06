/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
const express = require("express");
const Note = require("../Models/Note");
const notesRouter = new express.Router();

notesRouter.get("/performers", async (req, res, next) => {
  try {
    const performers = await Note.getPerformersByFilter(req.query);
    return res.json({ performers });
  } catch (e) {
    return next(e);
  }
});

module.exports = notesRouter;
