# Grateful Deadabase

Hosted at: www.grateful-deadabase.com
API documentation: https://app.swaggerhub.com/apis/altbrickart/gddb-api/1.0.0-oas3

This application serves as an archive of the Grateful Dead's shows. It includes data about the setlists and recordings for the show when available.
Users are able to search through filters to find a show matching their filter requests. Users can select a recording to play in the music player.

Features:

Music Player - I have implemented a music player that embeds an audio file from archive.org of the selected recording.
Using React state, this audio will continue to play while the user continues to browse the app.

Searching - I have implemented a responsive searching function. Users can select a filter and the choices from the other filters will be updated to match only the
shows that match the already selected filters. I decided to implement filtering in this way in order to allow users to learn more about the data based on the
filters that are available.

Today in GD History - I have implemented a page that shows all the shows from this day in history. This is a common request in the Grateful Dead community.

Tests are located in the Backend folder. Run jest to run the tests.

The landing page will take users to the Today in Grateful Dead history page, from there users can either select a show to see details and recordings, or select the
menu icon to perform a deep search using filters. Once a show is selected, a user will be presented with a detail page about the show that lists setlist data and all
available recordings of the show. Clicking on a song in the setlist will show all other shows that song was played in. Clicking on a recording will open the music player
and load an embedded audio file of the recording. Users can collapse the music player and continue to browse while the music continues playing.

API's used: api.setlist.fm and archive.org

Technology Stact: Node, PostgreSQL, Express, React, Material-UI
