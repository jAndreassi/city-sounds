// DEPENDENCIES (DOM Elements)
// DATA / STATE / GLOBAL VARIABLES
// FUNCTIONS
// USER INTERACTIONS
// INITIALIZATION



// Testing Deezer API

var deezerPlaylistURL = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/user/637006841/playlists";

fetch(deezerPlaylistURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  });