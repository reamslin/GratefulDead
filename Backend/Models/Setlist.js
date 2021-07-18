const db = require("../db");
const Venue = require("./Venue");
const { mapAsync } = require("lodasync");
const Set = require("./Set");
const { sqlForSetlistFilters } = require("../helpers");
const Recording = require("./Recording");
const ExpressError = require("./ExpressError");

class Setlist {
    constructor(id, venue, tour, day, month, year) {
        this.id = id;
        this.venue = venue;
        this.tour = tour;
        this.day = day;
        this.month = month;
        this.year = year;
    }

    static async create(venue, tour, day, month, year) {
        const result = await db.query(
            `INSERT INTO setlist (venue_id, tour, day, month, year)
            VALUES ($1, $2, $3, $4, $5) RETURNING id `, [venue.id, tour, day, month, year]);

        let { id } = result.rows[0];

        return new Setlist(id, venue, tour, day, month, year);
    }

    static async getById(id) {
        const result = await db.query(
            `SELECT * FROM setlist
            WHERE id = $1`, [id]
        );
        if (result.rows.length === 0) {
            throw new ExpressError("Setlist not found", 404);
        } else {
            let { id, tour, day, month, year } = result.rows[0];
            let venue = await Venue.getById(result.rows[0].venue_id);
            const setlist = new Setlist(id, venue, tour, day, month, year);
            setlist.sets = await setlist.getSets();
            setlist.recordings = await setlist.getRecordings();
            return setlist;
        }
    }

    static async getByFilter(filters) {
        const { joinStatements, whereConditions, limitCondition, offsetCondition, values } = sqlForSetlistFilters(filters);
        console.log(filters);
        const sqlQuery =
            `SELECT DISTINCT setlist.id, setlist.venue_id, setlist.tour, setlist.year, setlist.month, setlist.day FROM setlist
            ${[...joinStatements].join(" ")}
           ${whereConditions}
           ORDER BY setlist.year, setlist.month, setlist.day
           ${limitCondition} ${offsetCondition}`;

        const setlistRes = await db.query(
            sqlQuery, values);

        const setlists = await mapAsync(async (row) => {
            let venue = await Venue.getById(row.venue_id);
            return new Setlist(row.id, venue, row.tour, row.day, row.month, row.year)
        }, setlistRes.rows);

        return setlists;
    }

    static async getCount(filters) {
        const { joinStatements, whereConditions, limitCondition, offsetCondition, values } = sqlForSetlistFilters(filters);

        const sqlQuery =
            `SELECT count(*) FROM setlist
            ${[...joinStatements].join(" ")}
            ${whereConditions}
            ${limitCondition} ${offsetCondition}`;
        const countRes = await db.query(
            sqlQuery, values);

        return countRes.rows[0];
    }

    static async getYearsByFilter(filters) {
        const { joinStatements, whereConditions, limitCondition, offsetCondition, values } = sqlForSetlistFilters(filters);

        const sqlQuery =
            `SELECT DISTINCT year FROM setlist
            ${[...joinStatements].join(" ")}
            ${whereConditions}
            ORDER BY year
            ${limitCondition} ${offsetCondition}`;
        const yearRes = await db.query(
            sqlQuery, values);
        return yearRes.rows.map(r => r.year)
    }
    static async getMonthsByFilter(filters) {
        const { joinStatements, whereConditions, limitCondition, offsetCondition, values } = sqlForSetlistFilters(filters);

        const sqlQuery =
            `SELECT DISTINCT month FROM setlist
            ${[...joinStatements].join(" ")}
            ${whereConditions}
            ORDER BY month
            ${limitCondition} ${offsetCondition}`;
        const monthRes = await db.query(
            sqlQuery, values);
        return monthRes.rows.map(r => r.month)
    }
    static async getDaysByFilter(filters) {
        const { joinStatements, whereConditions, limitCondition, offsetCondition, values } = sqlForSetlistFilters(filters);

        const sqlQuery =
            `SELECT DISTINCT day FROM setlist
            ${[...joinStatements].join(" ")}
            ${whereConditions}
            ORDER BY day
            ${limitCondition} ${offsetCondition}`;
        const dayRes = await db.query(
            sqlQuery, values);
        return dayRes.rows.map(r => r.day)
    }

    async getSets() {
        return await Set.getBySetlist(this.id);
    }

    async getRecordings() {
        return await Recording.getBySetlist(this.id);
    }


}

module.exports = Setlist;

