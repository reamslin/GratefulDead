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
})

module.exports = coversRouter;