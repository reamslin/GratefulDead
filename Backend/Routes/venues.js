const express = require("express");
const Venue = require("../Models/Venue");
const venuesRouter = new express.Router();

venuesRouter.get("/", async (req, res, next) => {
    try {
        const venues = await Venue.getByFilter(req.query);
        return res.json({ venues });

    } catch (e) {
        return next(e);
    }
});

venuesRouter.get("/states", async (req, res, next) => {
    try {
        const states = await Venue.getStatesByFilter(req.query);
        return res.json({ states });

    } catch (e) {
        return next(e);
    }
});

venuesRouter.get("/cities", async (req, res, next) => {
    try {
        const cities = await Venue.getCitiesByFilter(req.query);
        return res.json({ cities });

    } catch (e) {
        return next(e);
    }
});

venuesRouter.get("/countries", async (req, res, next) => {
    try {
        const countries = await Venue.getCountriesByFilter(req.query);
        return res.json({ countries });

    } catch (e) {
        return next(e);
    }
});

venuesRouter.get("/:name", async (req, res, next) => {
    try {
        const venue = await Venue.getByName();
        return res.json({ venue });
    } catch (e) {
        return next(e);
    }
})





module.exports = venuesRouter;
