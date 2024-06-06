/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
process.env.NODE_ENV = "test";
const db = require("../db");
const Venue = require("./Venue");
const Setlist = require("./Setlist");

describe("setlist", function () {
  let data;
  let data2;

  beforeEach(async function () {
    data = {
      name: "name",
      city: "city",
      state: "state",
      country: "country",
    };

    data2 = {
      name: "name2",
      city: "city2",
      state: "state2",
      country: "country",
    };
  });

  afterEach(async function () {
    await db.query("DELETE FROM venue");
  });

  afterAll(async function () {
    // close db connection
    await db.end();
  });

  test("Creates a new venue", async function () {
    const venue1 = await Venue.create(...Object.values(data));

    // expect(setlist1.id).toEqual(1);
    expect(venue1.name).toEqual(data.name);
    expect(venue1.city).toEqual(data.city);
    expect(venue1.state).toEqual(data.state);
    expect(venue1.country).toEqual(data.country);
  });

  test("Venue can be found by id in db", async function () {
    const venue = await Venue.create(...Object.values(data));
    const venueRes = await Venue.getById(venue.id);

    expect(venue).toEqual(venueRes);
  });
  test("Venue can be found through filters", async function () {
    const venue1 = await Venue.create(...Object.values(data));
    const venue2 = await Venue.create(...Object.values(data2));
    //BAD --> requires setlists
    const setlist1 = await Setlist.create(venue1);
    const setlist2 = await Setlist.create(venue2);
    const venuesWithCity = await Venue.getByFilter({ city: "city" });
    const venuesWithCity2 = await Venue.getByFilter({ city: "city2" });
    const venuesWithCountry = await Venue.getByFilter({ country: "country" });

    expect(venuesWithCity).toEqual([venue1.name]);
    expect(venuesWithCity2).toEqual([venue2.name]);
    expect(venuesWithCountry).toEqual([venue1.name, venue2.name]);

    await db.query("DELETE FROM setlist");
  });
});
