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

class Tour {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static async create(name) {
    const result = await db.query(
      `INSERT INTO tour (name)
            VALUES ($1) RETURNING id `,
      [name]
    );

    let { id } = result.rows[0];
    return new Tour(id, name);
  }

  static async getByName(name) {
    const result = await db.query(
      `SELECT id, name FROM tour
            WHERE name = $1`,
      [name]
    );
    if (result.rows.length === 0) {
      return null;
    } else {
      let { id, name } = result.rows[0];
      return new Tour(id, name);
    }
  }

  static async getByFilter(filters) {
    const {
      joinStatements,
      whereConditions,
      limitCondition,
      offsetCondition,
      values,
    } = sqlForSetlistFilters(filters);
    //Make sure to join on setlist if there are other joins
    if (joinStatements) {
      joinStatements.add(`INNER JOIN tour ON setlist.tour_id = tour.id`);
    }
    console.log(filters);
    const sqlQuery = `SELECT DISTINCT tour.name FROM ${
      !joinStatements ? "tour" : "setlist"
    }
            ${[...joinStatements].join(" ")}
           ${whereConditions}
           ${!whereConditions ? "WHERE" : "AND"}
           tour.name IS NOT NULL
           ORDER BY tour.name
           ${limitCondition} ${offsetCondition}`;

    console.log(sqlQuery);
    const toursRes = await db.query(sqlQuery, values);

    const tours = toursRes.rows.map((r) => r.name);
    return tours;
  }
}

module.exports = Tour;
