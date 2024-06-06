/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
const db = require("../db");

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
}

module.exports = Tour;
