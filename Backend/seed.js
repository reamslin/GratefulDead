/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
const db = require("./db");
const Setlist = require("./Models/Setlist");
const Venue = require("./Models/Venue");
const axios = require("axios");
const Song = require("./Models/Song");
const Set = require("./Models/Set");
const Note = require("./Models/Note");
const Tour = require("./Models/Tour");
const Recording = require("./Models/Recording");

const API_KEY = "MkReNmtdxXkVQlBM5pdEAbt2Y70jp90swwON";
const SCRAPE_BASE_URL = "https://archive.org/services/search/v1/scrape";
const BASE_URL = "https://api.setlist.fm/rest/1.0";
const GD_MBID = "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6";
const GD_Collection = "GratefulDead";

let config = { headers: { "x-api-key": API_KEY } };

function pause(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function getSetlistsPage(p) {
  try {
    const results = await axios.get(
      `${BASE_URL}/artist/${GD_MBID}/setlists?p=${p}`,
      config
    );
    console.log("Fetched page ", p);
    return results.data.setlist;
  } catch (e) {
    return null;
  }
}

async function getAllSetlists() {
  let currentPage = 1;
  let setlists = [];
  while (true) {
    let results = await getSetlistsPage(currentPage);
    if (!results) break;
    setlists = setlists.concat(results);
    await pause(2000);
    currentPage++;
  }
  return setlists;
}
async function seedSetlists() {
  const setlists = await getAllSetlists();
  for (let setlist of setlists) {
    //check if venue is already in db;
    let venue_obj = await Venue.getByName(setlist.venue.name);
    if (!venue_obj) {
      venue_obj = await Venue.create(
        setlist.venue.name,
        setlist.venue.city.name,
        setlist.venue.city.state,
        setlist.venue.city.country.name
      );
    }

    //check if tour is alredy in db;
    let tour = setlist.tour ? setlist.tour.name : undefined;

    let day = setlist.eventDate.slice(0, 2);
    let month = setlist.eventDate.slice(3, 5);
    let year = setlist.eventDate.slice(6);
    let setlist_obj = await Setlist.create(venue_obj, tour, day, month, year);

    // seed recordings of setlist from archive.org
    await pause(2000);
    try {
      await seed_recordings(setlist_obj);
    } catch {}
    //for each set in setlist create set object

    for (let set of setlist.sets.set) {
      let set_obj = await Set.create(set.name || set.encore, setlist_obj.id);
      //for each song in set check if it is already in db, and add notes to db
      for (let song of set.song) {
        let song_obj = await Song.getByTitle(song.name);
        if (!song_obj) {
          let cover = song.cover ? song.cover.name : undefined;
          song_obj = await Song.create(song.name, cover);
        }
        let with_artist = song.with ? song.with.name : undefined;
        let note_obj = await Note.create(
          set_obj.id,
          song_obj.id,
          song.info,
          with_artist
        );
      }
    }
  }
}

async function seed_recordings(setlist) {
  let q = `collection:${GD_Collection} AND title:'${setlist.year}-${
    setlist.month
  }-${setlist.day}'
     AND venue:${setlist.venue.name
       .split(" ")
       .filter((w) => w !== "The")
       .join(" OR ")}`;
  let fields = "taper, transferer, identifier, source, subject, date";

  const result = await axios.get(SCRAPE_BASE_URL, { params: { q, fields } });
  console.log(
    `Made scrape request for ${setlist.year}-${setlist.month}-${setlist.day}`
  );
  console.log(`Query: ${q}`);

  let items = result.data.items;

  for (let item of items) {
    if (
      item.date.slice(0, 10) ===
      `${setlist.year}-${setlist.month}-${setlist.day}`
    ) {
      await Recording.create(
        setlist.id,
        item.identifier,
        item.taper,
        item.transferer,
        item.source,
        item.subject
      );
      console.log(`Found recording: ${item.identifier}`);
    }
  }
}

seedSetlists().then(() => console.log("Finished"));
