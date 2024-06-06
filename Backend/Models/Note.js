/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
const db = require("../db");
const Song = require("./Song");
const { mapAsync } = require("lodasync");
const { sqlForSetlistFilters } = require("../helpers");

class Note {
  constructor(id, info, with_artist) {
    this.id = id;
    this.info = info;
    this.with_artist = with_artist;
  }

  static async create(set_id, song_id, info, w) {
    const result = await db.query(
      `INSERT INTO note (set_id, song_id, info, with_artist)
            VALUES ($1, $2, $3, $4) RETURNING id `,
      [set_id, song_id, info, w]
    );

    let { id } = result.rows[0];

    return new Note(id, info, w);
  }

  static async getBySet(id) {
    let result = await db.query(
      `
        SELECT * FROM note
        WHERE set_id = $1`,
      [id]
    );

    const notes = await mapAsync(async (row) => {
      let note = new Note(row.id, row.info, row.with_artist);
      note.song = await note.getSong(row.song_id);
      return note;
    }, result.rows);

    return notes;
  }

  async getSong(song_id) {
    return await Song.getById(song_id);
  }

  static async getPerformersByFilter(filters) {
    let {
      joinStatements,
      whereConditions,
      limitCondition,
      offsetCondition,
      values,
    } = sqlForSetlistFilters(filters);
    //Make sure to join on setlist if there are other joins
    if (joinStatements) {
      joinStatements.add(`INNER JOIN set ON setlist.id = set.setlist_id`);
      joinStatements.add(`INNER JOIN note ON set.id = note.set_id`);
    }
    console.log(filters);
    const sqlQuery = `SELECT DISTINCT note.with_artist FROM ${
      !joinStatements ? "note" : "setlist"
    }
           ${[...joinStatements].join(" ")}
           ${whereConditions}
           ${!whereConditions ? "WHERE" : "AND"}
           note.with_artist IS NOT NULL
           ORDER BY note.with_artist
           ${limitCondition} ${offsetCondition}`;

    console.log(sqlQuery);
    const performersRes = await db.query(sqlQuery, values);

    const performers = performersRes.rows.map((r) => r.with_artist);
    return performers;
  }
}

module.exports = Note;
