const express = require("express");
const Setlist = require("../Models/Setlist");
const setlistsRouter = new express.Router();

/** /setlists */

/** Might be better to implement search through query string */

/** GET /setlists */
setlistsRouter.get("/", async (req, res, next) => {
    console.log('GET /setlists')
    try {
        const setlists = await Setlist.getByFilter(req.query);
        return res.json({ setlists });

    } catch (e) {
        return next(e);
    }
});

setlistsRouter.get("/years", async (req, res, next) => {
    try {
        const years = await Setlist.getYearsByFilter(req.query);
        return res.json({ years })
    } catch (e) {
        return next(e)
    }
});

setlistsRouter.get("/months", async (req, res, next) => {
    try {
        const months = await Setlist.getMonthsByFilter(req.query);
        return res.json({ months })
    } catch (e) {
        return next(e)
    }
});

setlistsRouter.get("/days", async (req, res, next) => {
    try {
        const days = await Setlist.getDaysByFilter(req.query);
        return res.json({ days })
    } catch (e) {
        return next(e)
    }
});


setlistsRouter.get("/count", async (req, res, next) => {
    try {
        const count = await Setlist.getCount(req.query);
        return res.json(count);
    } catch (e) {
        return next(e);
    }
});

setlistsRouter.get("/:id", async (req, res, next) => {
    try {
        const setlist = await Setlist.getById(req.params.id);
        return res.json({ setlist })
    } catch (e) {
        return next(e);
    }
});






module.exports = setlistsRouter;