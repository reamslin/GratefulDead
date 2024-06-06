/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */

CREATE DATABASE gd;
\c gd;

CREATE TABLE venue(
    id SERIAL PRIMARY KEY,
    name TEXT,
    city TEXT,
    state TEXT,
    country TEXT
);

CREATE TABLE tour(
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE setlist(
    id SERIAL PRIMARY KEY,
    venue_id INTEGER REFERENCES venue,
    tour_id INTEGER REFERENCES tour,
    day TEXT,
    month TEXT,
    year TEXT
);

CREATE TABLE set(
    id SERIAL PRIMARY KEY,
    name TEXT,
    setlist_id INTEGER REFERENCES setlist
);

CREATE TABLE song(
    id SERIAL PRIMARY KEY,
    title TEXT,
    cover TEXT
);

CREATE TABLE note(
    id SERIAL PRIMARY KEY,
    set_id INTEGER REFERENCES set,
    song_id INTEGER REFERENCES song,
    info TEXT,
    with_artist TEXT
);

CREATE TABLE recording(
    id SERIAL PRIMARY KEY,
    identifier TEXT,
    setlist_id INTEGER REFERENCES setlist,
    taper Text,
    transferer Text,
    source Text,
    subject Text
);

