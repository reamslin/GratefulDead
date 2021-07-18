const express = require("express");
const Song = require("../Models/Song");
const songsRouter = new express.Router();

songsRouter.get("/", async (req, res, next) => {
    try {
        const songs = await Song.getByFilter(req.query);
        return res.json({ songs });

    } catch (e) {
        return next(e);
    }
})

module.exports = songsRouter;
