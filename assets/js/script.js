// DEPENDENCIES (DOM Elements)
// DATA / STATE / GLOBAL VARIABLES



// FUNCTIONS

var searchBar = document.querySelector(".search-bar");
var recentSearches = document.querySelector(".recent-searches");
// maybe not exactly right, but something like this
var countryName = searchBar.value;


// evaluate what we're listening for depending on if submit button or not. click may not be right
// searchBar.addEventListener("click", searchCountry);

recentSearches.addEventListener("click", function(event) {
  // add an if statement to make event.target is the proper class
  // this will need updating for our recent search schema
  var recentSearch = event.target.textContent;
  searchCountry(recentSearch);
});

// function to detect if local storage exists and to populate recent searches if so
function checkAndDisplayRecentSearches() {
  var localStorage = JSON.parse(localStorage.getItem("recentSearches"));
  if (localStorage !== null) {
    // render recent search dropdown and put on page
    // if dropdowns just take an array as an argument, then don't need for loop, just need to get array for it
    for (i = 0; i < localStorage.length; i++ ) {
      // display each part of the localStorage in dropdown
    }
  }
}

function searchCountry(countryName) {
  // move Google Map to queried country
  googleMapZoom(countryName);

  // query Deezer for playlist associated with country and render on page
  fetchAndRenderPlaylist(countryName);


  // save query to local storage
  saveLocalStorage(countryName);

  // adds new localStorage to dropDown
  renderNewestLocalStorage();


}

function saveLocalStorage(countryName) {

}

function renderNewestLocalStorage () {
  var localStorage = JSON.parse(localStorage.getItem("recentSearches"));
  if (localStorage === null) { 
    checkAndDisplayRecentSearches();
  } else {
    // display only most recent addition (adding to the array and rendering
  }
}

// API GRABS

  // Deezer

// CORS Proxy Server Using Rapid API
deezerPlaylistUrl = "https://api.deezer.com/user/637006841/playlists&limit=100";

const encodedParams = new URLSearchParams();
encodedParams.append("my-url", deezerPlaylistUrl);

const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': '492bbad1e0msh127b51cb43ca626p106abejsn53757b96005b',
    'X-RapidAPI-Host': 'cors-proxy3.p.rapidapi.com'
  },
  body: encodedParams
};

// getting Array of countries 
var countryArr = [];

fetch('https://cors-proxy3.p.rapidapi.com/api', options)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    playlistArr = [];
    for (i = 0; i < data.data.length; i++) {
      var playlistName = data.data[i].title;
      if (playlistName.includes("Songcatcher") !== true && playlistName.includes("SongCatcher") !== true && playlistName.includes("Worldwide") !== true && playlistName.includes("Top")) {
        playlistArr.unshift(playlistName)
      }
    }
    for (z = 0; z < playlistArr.length; z++) {
      countryArr.unshift(playlistArr[z].split(" ")[1]);
    }
    console.log(countryArr);
  });

function fetchAndRenderPlaylist(countryName) {

}

// Google

  // Google Maps to Display

  // Google Maps Markers

function googleMapZoom(countryName) {

}
  
  
  
  // USER INTERACTIONS
    // search bar – event listener
    // recent searches – event listener
  
  
  // INITIALIZATION
    // on page load map appears and form appears
    // once local storage, recent searches appears
    // Chart appears on searech (map zoom)