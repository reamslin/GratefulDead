/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
const db = require("../db");
const { sqlForSetlistFilters } = require("../helpers");
const ExpressError = require("./ExpressError");

class Venue {
  constructor(id, name, city, state, country) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.state = state;
    this.country = country;
  }

  static async create(name, city, state, country) {
    const result = await db.query(
      `INSERT INTO venue (name, city, state, country)
            VALUES ($1, $2, $3, $4) RETURNING id `,
      [name, city, state, country]
    );

    let { id } = result.rows[0];
    return new Venue(id, name, city, state, country);
  }

  static async getByName(name) {
    const result = await db.query(
      `SELECT id, name, city, state, country FROM venue
            WHERE name = $1`,
      [name]
    );
    if (result.rows.length === 0) {
      return null;
    } else {
      let { id, name, city, state, country } = result.rows[0];
      return new Venue(id, name, city, state, country);
    }
  }

  static async getById(id) {
    const result = await db.query(
      `SELECT id, name, city, state, country FROM venue
            WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      throw new ExpressError("Venue not found", 404);
    } else {
      let { id, name, city, state, country } = result.rows[0];
      return new Venue(id, name, city, state, country);
    }
  }

  static async getAll() {
    const result = await db.query(
      `SELECT DISTINCT name FROM venue
            ORDER BY name`
    );
    return result.rows.map((r) => r.name);
  }

  static async getByFilter(filters) {
    const {
      joinStatements,
      whereConditions,
      limitCondition,
      offsetCondition,
      values,
    } = sqlForSetlistFilters(filters);
    // Make sure to join on setlist if there are other joins
    if (joinStatements) {
      joinStatements.add(`INNER JOIN venue ON venue.id = setlist.venue_id`);
    }
    console.log(filters);
    const sqlQuery = `SELECT DISTINCT venue.name FROM ${
      !joinStatements ? "venue" : "setlist"
    }
            ${[...joinStatements].join(" ")}
           ${whereConditions}
           ${!whereConditions ? "WHERE" : "AND"}
           venue.name IS NOT NULL
           ORDER BY venue.name
           ${limitCondition} ${offsetCondition}`;

    console.log(sqlQuery);
    const venuesRes = await db.query(sqlQuery, values);

    const venues = venuesRes.rows.map((r) => r.name);
    return venues;
  }

  static async getStatesByFilter(filters) {
    const {
      joinStatements,
      whereConditions,
      limitCondition,
      offsetCondition,
      values,
    } = sqlForSetlistFilters(filters);
    // Make sure to join on setlist if there are other joins
    if (joinStatements) {
      joinStatements.add(`INNER JOIN venue ON venue.id = setlist.venue_id`);
    }
    console.log(filters);
    const sqlQuery = `SELECT DISTINCT venue.state FROM ${
      !joinStatements ? "venue" : "setlist"
    }
            ${[...joinStatements].join(" ")}
           ${whereConditions}
           ${!whereConditions ? "WHERE" : "AND"}
           venue.state IS NOT NULL
           ORDER BY venue.state
           ${limitCondition} ${offsetCondition}`;

    console.log(sqlQuery);
    const statesRes = await db.query(sqlQuery, values);

    const states = statesRes.rows.map((r) => r.state);
    return states;
  }

  static async getCitiesByFilter(filters) {
    const {
      joinStatements,
      whereConditions,
      limitCondition,
      offsetCondition,
      values,
    } = sqlForSetlistFilters(filters);
    // Make sure to join on setlist if there are other joins
    if (joinStatements) {
      joinStatements.add(`INNER JOIN venue ON venue.id = setlist.venue_id`);
    }
    console.log(filters);
    const sqlQuery = `SELECT DISTINCT venue.city FROM ${
      !joinStatements ? "venue" : "setlist"
    }
            ${[...joinStatements].join(" ")}
           ${whereConditions}
           ${!whereConditions ? "WHERE" : "AND"}
           venue.city IS NOT NULL
           ORDER BY venue.city
           ${limitCondition} ${offsetCondition}`;

    console.log(sqlQuery);
    const citiesRes = await db.query(sqlQuery, values);

    const cities = citiesRes.rows.map((r) => r.city);
    return cities;
  }

  static async getCountriesByFilter(filters) {
    const {
      joinStatements,
      whereConditions,
      limitCondition,
      offsetCondition,
      values,
    } = sqlForSetlistFilters(filters);
    // Make sure to join on setlist if there are other joins
    if (joinStatements) {
      joinStatements.add(`INNER JOIN venue ON venue.id = setlist.venue_id`);
    }
    console.log(filters);
    const sqlQuery = `SELECT DISTINCT venue.country FROM ${
      !joinStatements ? "venue" : "setlist"
    }
            ${[...joinStatements].join(" ")}
           ${whereConditions}
           ${!whereConditions ? "WHERE" : "AND"}
           venue.country IS NOT NULL
           ORDER BY venue.country
           ${limitCondition} ${offsetCondition}`;

    console.log(sqlQuery);
    const countriesRes = await db.query(sqlQuery, values);

    const countries = countriesRes.rows.map((r) => r.country);
    return countries;
  }
}

module.exports = Venue;
