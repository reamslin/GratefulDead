/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
const db = require("../db");
const Note = require("./Note");
const { mapAsync } = require("lodasync");

class Set {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static async create(name, setlist_id) {
    // setlist.fm stores encores differently than normal sets,
    // using integers instead of set names
    // --> if given a number (n) turn to "encore n"
    if (typeof name === "number") {
      name = `Encore ${name}:`;
    }
    const result = await db.query(
      `INSERT INTO set (name, setlist_id)
            VALUES ($1, $2) RETURNING id `,
      [name, setlist_id]
    );

    let { id } = result.rows[0];

    return new Set(id, name);
  }

  static async getBySetlist(id) {
    const result = await db.query(
      `SELECT * FROM set
            WHERE setlist_id = $1`,
      [id]
    );

    const sets = await mapAsync(async (row) => {
      let set = new Set(row.id, row.name);
      set.notes = await set.getNotes();
      return set;
    }, result.rows);

    return sets;
  }

  async getNotes() {
    return await Note.getBySet(this.id);
  }
}

module.exports = Set;
