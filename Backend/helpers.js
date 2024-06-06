/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
const ExpressError = require("./Models/ExpressError");

function sqlForSetlistFilters(filters) {
  const acceptedFilters = [
    "venue",
    "tour",
    "city",
    "state",
    "country",
    "year",
    "month",
    "day",
    "song",
    "cover",
    "performer",
    "limit",
    "offset",
  ];
  const keys = Object.keys(filters);
  keys.forEach((key) => {
    console.log(key);
    let index = acceptedFilters.indexOf(key);
    if (index == -1) {
      throw new ExpressError("Bad query request", 400);
    }
  });
  if (keys.length === 0)
    return {
      joinStatements: "",
      whereConditions: "",
      limitCondition: "",
      offsetCondition: "",
      values: [],
    };

  let whereConditions = keys.map((filterName, idx) => {
    if (filterName === "year") {
      return `setlist.year = $${idx + 1}`;
    } else if (filterName === "month") {
      return `setlist.month = $${idx + 1}`;
    } else if (filterName === "day") {
      return `setlist.day = $${idx + 1}`;
    } else if (filterName === "song") {
      return `song.title = $${idx + 1}`;
    } else if (filterName === "venue") {
      return `venue.name = $${idx + 1}`;
    } else if (filterName === "tour") {
      return `tour.name = $${idx + 1}`;
    } else if (filterName === "cover") {
      return `song.cover = $${idx + 1}`;
    } else if (filterName === "performer") {
      return `note.with_artist = $${idx + 1}`;
    } else if (filterName === "state") {
      return `venue.state = $${idx + 1}`;
    } else if (filterName === "city") {
      return `venue.city = $${idx + 1}`;
    } else if (filterName === "country") {
      return `venue.country = $${idx + 1}`;
    } else {
      return "";
    }
  });

  whereConditions = whereConditions.filter((s) => s !== "");

  if (whereConditions.length !== 0) {
    whereConditions = `WHERE ${whereConditions.join(" AND ")}`;
  } else {
    whereConditions = "";
  }

  let joinStatements = new Set();
  let venue_id = keys.indexOf("venue");
  let state_id = keys.indexOf("state");
  let city_id = keys.indexOf("city");
  let country_id = keys.indexOf("country");
  let tour_id = keys.indexOf("tour");

  if (
    venue_id !== -1 ||
    state_id !== -1 ||
    city_id !== -1 ||
    country_id !== -1
  ) {
    joinStatements.add(`INNER JOIN venue ON venue.id = setlist.venue_id`);
  }

  if (tour_id !== -1) {
    joinStatements.add(`INNER JOIN tour ON tour.id = setlist.tour_id`);
  }

  let song_id = keys.indexOf("song");
  let cover_id = keys.indexOf("cover");
  let performer_id = keys.indexOf("performer");

  if (performer_id !== -1) {
    joinStatements.add(`INNER JOIN set ON setlist.id = set.setlist_id`);
    joinStatements.add(`INNER JOIN note ON set.id = note.set_id`);
  }

  if (song_id !== -1 || cover_id !== -1) {
    joinStatements.add(`INNER JOIN set ON setlist.id = set.setlist_id`);
    joinStatements.add(`INNER JOIN note ON set.id = note.set_id`);
    joinStatements.add(`INNER JOIN song ON song.id = note.song_id`);
  }

  let limit = keys.indexOf("limit");
  let limitCondition = "";

  if (limit !== -1) {
    limitCondition = `LIMIT $${limit + 1}`;
    filters.limit = parseInt(filters.limit);
  }

  let offset = keys.indexOf("offset");
  let offsetCondition = "";

  if (offset !== -1) {
    offsetCondition = `OFFSET $${offset + 1}`;
    filters.offset = parseInt(filters.offset);
  }

  console.log(Object.values(filters));
  //console.log(`WHERE ${conditions.filter(s => s != "").join(" AND ")} ${limitCondition}`);
  return {
    joinStatements,
    whereConditions,
    limitCondition,
    offsetCondition,
    values: Object.values(filters),
  };
}

module.exports = { sqlForSetlistFilters };
