/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
process.env.NODE_ENV = "test";
const db = require("../db");
const Setlist = require("../Models/Setlist");
const Set = require("../Models/Set");
const Song = require("../Models/Song");
const Note = require("../Models/Note");
const Venue = require("../Models/Venue");

// npm packages
const request = require("supertest");

// app imports
const app = require("../server");

describe("Routes", function () {
  let venue;
  let venue2;
  let setlist1;
  let setlist2;
  let setlist3;
  let set1;
  let set2;
  let set3;
  let song1;
  let song2;
  let note1;
  let note2;
  let note3;

  beforeAll(async function () {
    venue = await Venue.create("name", "city", "state", "country");
    venue2 = await Venue.create("name2", "city2", "state2", "country2");
    setlist1 = await Setlist.create(venue, "tour", "day", "month", "year");
    setlist2 = await Setlist.create(venue, "tour", "day", "month", "year2");
    setlist3 = await Setlist.create(venue2, "tour", "day2", "month2", "year3");
    set1 = await Set.create("name", setlist1.id);
    set2 = await Set.create("name", setlist2.id);
    set3 = await Set.create("name", setlist3.id);
    song1 = await Song.create("title", null);
    song2 = await Song.create("title2", "name");
    note1 = await Note.create(set1.id, song1.id, "info", "name");
    note2 = await Note.create(set2.id, song2.id, "info", "name2");
    note3 = await Note.create(set3.id, song1.id, "info", "name");
  });

  afterAll(async function () {
    await db.query("DELETE FROM note");
    await db.query("DELETE FROM song");
    await db.query("DELETE FROM set");
    await db.query("DELETE FROM setlist");
    await db.query("DELETE FROM venue");
    await db.end();
  });
  describe("GET /setlists", function () {
    test("/setlists no filter", async function () {
      const response = await request(app).get(`/setlists`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        setlists: [setlist1, setlist2, setlist3],
      });
    });
    test("/setlists with filters", async function () {
      const response = await request(app)
        .get(`/setlists`)
        .query({ song: song1.title, year: setlist1.year });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        setlists: [setlist1],
      });
    });

    describe("GET /setlists/count", function () {
      test("gets count of setlists", async function () {
        const response = await request(app).get("/setlists/count");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          count: "3",
        });
      });
    });

    describe("GET /setlists/years", function () {
      test("gets years of setlists", async function () {
        const response = await request(app).get("/setlists/years");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          years: ["year", "year2", "year3"],
        });
      });
    });

    describe("GET /setlists/months", function () {
      test("gets months of setlists", async function () {
        const response = await request(app).get("/setlists/months");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          months: ["month", "month2"],
        });
      });
    });

    describe("GET /setlists/days", function () {
      test("gets days of setlists", async function () {
        const response = await request(app).get("/setlists/months");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          months: ["month", "month2"],
        });
      });
    });
  });

  describe("GET /venues", function () {
    test("gets venues no filter", async function () {
      const response = await request(app).get("/venues");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        venues: [venue.name, venue2.name],
      });
    });

    test("gets venues with filters", async function () {
      const response = await request(app)
        .get("/venues")
        .query({ performer: "name", month: "month2" });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        venues: [venue2.name],
      });
    });
  });
});
