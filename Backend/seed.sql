CREATE DATABASE gd;
\c gd;

CREATE TABLE venue(
    id SERIAL PRIMARY KEY,
    name TEXT,
    city TEXT,
    state TEXT,
    country TEXT
);

CREATE TABLE setlist(
    id SERIAL PRIMARY KEY,
    venue_id INTEGER REFERENCES venue,
    tour TEXT,
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

