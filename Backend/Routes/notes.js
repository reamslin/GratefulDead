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
})

module.exports = notesRouter;