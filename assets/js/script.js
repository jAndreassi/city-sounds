// DEPENDENCIES (DOM Elements)
// DATA / STATE / GLOBAL VARIABLES



// FUNCTIONS

var searchBar = document.querySelector(".search-bar");
var recentSearchesDropdown = document.querySelector(".recent-searches");

searchBar.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    var searchValue = event.target.value.trim();
    if (searchValue.length > 0) {
      // Save search to local storage
      var recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
      recentSearches.unshift(searchValue);
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
      
       // Update recent searches dropdown
       updateRecentSearches(recentSearches);
      
       // Move map to searched location
       googleMapZoom(searchValue);
       
       // Query Deezer for playlist associated with country and render on page
       fetchAndRenderPlaylist(searchValue);
    }
  }
});

function updateRecentSearches(recentSearches) {
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

  // Testing Deezer API

var deezerPlaylistURL = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/user/637006841/playlists";

fetch(deezerPlaylistURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
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