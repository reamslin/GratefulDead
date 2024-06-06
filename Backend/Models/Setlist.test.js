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
    const venueData = {
      name: "venue_name",
      city: "venue_city",
      state: "venue_state",
      country: "venue_country",
    };

    let venue = await Venue.create(...Object.values(venueData));
    data = {
      venue,
      tour: "tour",
      day: "day",
      month: "month",
      year: "year",
    };

    data2 = {
      venue,
      tour: "tour2",
      day: "day2",
      month: "month2",
      year: "year",
    };
  });

  afterEach(async function () {
    await db.query("DELETE FROM setlist");
    await db.query("DELETE FROM venue");
  });

  afterAll(async function () {
    // close db connection
    await db.end();
  });

  test("Creates a new setlist", async function () {
    const setlist1 = await Setlist.create(...Object.values(data));

    // expect(setlist1.id).toEqual(1);
    expect(setlist1.venue).toEqual(data.venue);
    expect(setlist1.tour).toEqual(data.tour);
    expect(setlist1.day).toEqual(data.day);
    expect(setlist1.month).toEqual(data.month);
    expect(setlist1.year).toEqual(data.year);

    const setlist2 = await Setlist.create(...Object.values(data2));

    //expect(setlist2.id).toEqual(2);
    expect(setlist2.venue).toEqual(data2.venue);
    expect(setlist2.tour).toEqual(data2.tour);
    expect(setlist2.day).toEqual(data2.day);
    expect(setlist2.month).toEqual(data2.month);
    expect(setlist2.year).toEqual(data2.year);
  });
  test("Setlist can be found by id in db", async function () {
    const setlist = await Setlist.create(...Object.values(data));
    const setlistRes = await Setlist.getById(setlist.id);

    expect(setlist.id).toEqual(setlistRes.id);
    expect(setlist.venue).toEqual(setlistRes.venue);
    expect(setlist.year).toEqual(setlistRes.year);
    expect(setlist.month).toEqual(setlistRes.month);
    expect(setlist.day).toEqual(setlistRes.day);
  });
  test("Setlist can be found through filters", async function () {
    const setlist1 = await Setlist.create(...Object.values(data));
    const setlist2 = await Setlist.create(...Object.values(data2));
    const setlistsWithMonth = await Setlist.getByFilter({ month: "month" });
    const setlistsWithMonth2 = await Setlist.getByFilter({ month: "month2" });
    const setlistsWithYear = await Setlist.getByFilter({ year: "year" });

    expect(setlistsWithMonth).toEqual([setlist1]);
    expect(setlistsWithMonth2).toEqual([setlist2]);
    expect(setlistsWithYear).toEqual([setlist1, setlist2]);
  });
});
