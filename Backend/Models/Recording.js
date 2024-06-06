/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
const db = require("../db");

class Recording {
  constructor(id, identifier, taper, transferer, source, subject) {
    this.id = id;
    this.identifier = identifier;
    this.taper = taper;
    this.transferer = transferer;
    this.source = source;
    this.subject = subject;
  }

  static async create(
    setlist_id,
    identifier,
    taper,
    transferer,
    source,
    subject
  ) {
    const result = await db.query(
      `INSERT INTO recording (setlist_id, identifier, taper, transferer, source, subject)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING id `,
      [setlist_id, identifier, taper, transferer, source, subject]
    );

    let { id } = result.rows[0];

    return new Recording(id, identifier);
  }

  static async getBySetlist(id) {
    const result = await db.query(
      `
        SELECT * FROM recording
        WHERE setlist_id = $1`,
      [id]
    );

    return result.rows.map(
      (r) =>
        new Recording(
          r.id,
          r.identifier,
          r.taper,
          r.transferer,
          r.source,
          r.subject
        )
    );
  }
}

module.exports = Recording;
