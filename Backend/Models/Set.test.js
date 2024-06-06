/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
process.env.NODE_ENV = "test";
const db = require("../db");
const Set = require("./Set");
const Venue = require("./Venue");
const Setlist = require("./Setlist");

describe("set", function () {
  let data;
  let data2;
  let setlist;

  beforeEach(async function () {
    const venue = await Venue.create("name", "city", "state", "country");
    setlist = await Setlist.create(venue, "tour", "year", "month", "day");
    data = {
      name: "name",
      setlist_id: setlist.id,
    };

    data2 = {
      name: "name2",
      setlist_id: setlist.id,
    };
  });

  afterEach(async function () {
    await db.query("DELETE FROM set");
    await db.query("DELETE FROM setlist");
    await db.query("DELETE FROM venue");
  });

  afterAll(async function () {
    // close db connection
    await db.end();
  });

  test("Creates a new set", async function () {
    const set1 = await Set.create(...Object.values(data));

    // expect(setlist1.id).toEqual(1);
    expect(set1.name).toEqual(data.name);
  });

  test("Get sets by setlist", async function () {
    const set1 = await Set.create(...Object.values(data));
    const set2 = await Set.create(...Object.values(data2));

    const sets = await Set.getBySetlist(setlist.id);

    set1.notes = [];
    set2.notes = [];

    expect(sets).toEqual([set1, set2]);
  });
});
