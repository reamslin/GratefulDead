process.env.NODE_ENV = "test";
const db = require("../db");
const Set = require("./Set");
const Venue = require("./Venue");
const Setlist = require("./Setlist");
const Song = require("./Song");
const Note = require("./Note");


describe("note", function () {
    let data;
    let data2;
    let set;
    let song1;
    let song2;

    beforeEach(async function () {
        const venue = await Venue.create("name", "city", "state", "country");
        const setlist = await Setlist.create(venue, "tour", "year", "month", "day");
        song1 = await Song.create("title", null);
        song2 = await Song.create("title2", null);
        set = await Set.create("name", setlist.id);
        data = {
            set_id: set.id,
            song_id: song1.id,
            info: "info",
            with_artist: "name1",
        }

        data2 = {
            set_id: set.id,
            song_id: song2.id,
            info: "info",
            with_artist: "name2",
        }

    })

    afterEach(async function () {
        await db.query("DELETE FROM note");
        await db.query("DELETE FROM song")
        await db.query("DELETE FROM set");
        await db.query("DELETE FROM setlist");
        await db.query("DELETE FROM venue");

    })

    afterAll(async function () {
        // close db connection
        await db.end();
    });

    test("Creates a new note", async function () {
        const note1 = await Note.create(...Object.values(data));

        expect(note1.with_artist).toEqual(data.with_artist);
        expect(note1.info).toEqual(data.info);

    });

    test("Get notes by set", async function () {
        const note1 = await Note.create(...Object.values(data));
        const note2 = await Note.create(...Object.values(data2));

        const notes = await Note.getBySet(set.id);

        note1.song = song1;
        note2.song = song2;

        expect(notes).toEqual([note1, note2])
    })
});