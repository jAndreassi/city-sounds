// DEPENDENCIES (DOM Elements)
// DATA / STATE / GLOBAL VARIABLES



// FUNCTIONS

// maybe not exactly right, but something like this
// var countryName = searchBar.value;

var searchBar = document.querySelector(".search-bar");
var submitButton = document.querySelector(".submit-btn");
var recentSearchesDropdown = document.querySelector(".recent-searches");
var recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];

function searchCountry(searchValue) {
  // // move Map to queried country
  // mapZoom(searchValue);

  // // query Deezer for playlist associated with country and render on page
  // fetchAndRenderPlaylist(searchValue);

  // save query to local storage
  addToLocalStorage(searchValue);

  // adds new localStorage to dropDown
  updateRecentSearches();

}

// submit button event listener for Enter
searchBar.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    var searchValue = event.target.value.trim();
    searchCountry(searchValue);
  }
});

// submit button eventlistener for click
submitButton.addEventListener("click", function() {
  var searchValue = searchBar.value.trim();
  searchCountry(searchValue);
  });

// event listener for recent search dropdown
recentSearchesDropdown.addEventListener("click", function(event) {
  // add an if statement to make event.target is the proper class
  // this will need updating for our recent search schema
  var recentSearch = event.target.textContent;
  searchCountry(recentSearch);
});


// to be defined
function mapZoom(searchValue) {
  console.log(searchValue);
}

// to be defined
function fetchAndRenderPlaylist(searchValue) {
  console.log(searchValue);
}


// adds searchValues to localStorage
function addToLocalStorage(searchValue) {
  if (searchValue.length > 0) {
    // Save search to local storage
    recentSearches.unshift(searchValue);
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }
}

// To eventually update dropdown for recentSearches – this is re-rendering all of them everytime this is called, which may be fine.
// Should add a check to make sure that it's not currently in the local storage
function updateRecentSearches() {
  recentSearchesDropdown.innerHTML = "";
  for (var i = 0; i < recentSearches.length; i++) {
    var listItem = document.createElement("a");
    listItem.classList.add("dropdown-item");
    listItem.textContent = recentSearches[i];
    recentSearchesDropdown.appendChild(listItem);
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

// Map API

  //  Map to Display

  //  Maps Markers

  
  
  
  // USER INTERACTIONS
    // search bar – event listener
    // recent searches – event listener
  
  
  // INITIALIZATION
    // on page load map appears and form appears
    // once local storage, recent searches appears
    // Chart appears on searech (map zoom)