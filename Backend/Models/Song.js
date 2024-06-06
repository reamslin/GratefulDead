/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
const db = require("../db");
const { sqlForSetlistFilters } = require("../helpers");

class Song {
  constructor(id, title, cover) {
    this.id = id;
    this.title = title;
    this.cover = cover;
  }

  static async create(title, cover) {
    const result = await db.query(
      `INSERT INTO song (title, cover)
            VALUES ($1, $2) RETURNING id `,
      [title, cover]
    );

    let { id } = result.rows[0];
    return new Song(id, title, cover);
  }

  static async getByTitle(title) {
    const result = await db.query(
      `SELECT id, title, cover FROM song
            WHERE title = $1`,
      [title]
    );
    if (result.rows.length === 0) {
      return null;
    } else {
      let { id, title, cover } = result.rows[0];
      return new Song(id, title, cover);
    }
  }

  static async getById(id) {
    const result = await db.query(
      `SELECT id, title, cover FROM song
            WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      throw new ExpressError("Song not found", 404);
    } else {
      let { id, title, cover } = result.rows[0];
      return new Song(id, title, cover);
    }
  }

  static async getAll() {
    const result = await db.query(
      `SELECT DISTINCT title FROM song
            ORDER BY title`
    );
    return result.rows.map((r) => r.title);
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
      joinStatements.add(`INNER JOIN set ON setlist.id = set.setlist_id`);
      joinStatements.add(`INNER JOIN note ON set.id = note.set_id`);
      joinStatements.add(`INNER JOIN song ON song.id = note.song_id`);
    }
    console.log(filters);
    const sqlQuery = `SELECT DISTINCT song.title FROM ${
      !joinStatements ? "song" : "setlist"
    }
            ${[...joinStatements].join(" ")}
           ${whereConditions}
           ${!whereConditions ? "WHERE" : "AND"}
           song.title IS NOT NULL
           ORDER BY song.title
           ${limitCondition} ${offsetCondition}`;

    console.log(sqlQuery);
    const songsRes = await db.query(sqlQuery, values);

    const songs = songsRes.rows.map((r) => r.title);
    return songs;
  }
  static async getCoversByFilter(filters) {
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
      joinStatements.add(`INNER JOIN song ON song.id = note.song_id`);
    }
    console.log(filters);
    const sqlQuery = `SELECT DISTINCT song.cover FROM ${
      !joinStatements ? "song" : "setlist"
    }
           ${[...joinStatements].join(" ")}
           ${whereConditions}
           ${!whereConditions ? "WHERE" : "AND"}
           song.cover IS NOT NULL
           ORDER BY song.cover
           ${limitCondition} ${offsetCondition}`;

    console.log(sqlQuery);
    const coversRes = await db.query(sqlQuery, values);

    const covers = coversRes.rows.map((r) => r.cover);
    return covers;
  }
}

module.exports = Song;
