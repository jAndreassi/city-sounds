// DEPENDENCIES (DOM Elements)
// DATA / STATE / GLOBAL VARIABLES



// FUNCTIONS

<<<<<<< HEAD
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

// on page load, renders LocalStorage
updateRecentSearches();

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
=======
var searchBar = document.querySelector(".search-bar");
var recentSearchesDropdown = document.querySelector(".recent-searches");
var submitButton = document.querySelector(".button");

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
>>>>>>> 73ba7ef77ac4eb610f4bb42618914f1271605751
  }
});

<<<<<<< HEAD
// To eventually update dropdown for recentSearches – this is re-rendering all of them everytime this is called I think, which may be fine, especially if we are eventually limiting the number.
// Should add a check to make sure that it's not currently in the local storage maybe? So we don't get multiple of the same search?
function updateRecentSearches() {
=======
submitButton.addEventListener("click", function(event) {
  var searchValue = searchBar.value.trim();
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
});
function updateRecentSearches(recentSearches) {
>>>>>>> 73ba7ef77ac4eb610f4bb42618914f1271605751
  recentSearchesDropdown.innerHTML = "";
  for (var i = 0; i < recentSearches.length; i++) {
    var listItem = document.createElement("a");
    listItem.classList.add("dropdown-item");
    listItem.textContent = recentSearches[i];
    recentSearchesDropdown.appendChild(listItem);
  }
}
<<<<<<< HEAD


=======
>>>>>>> 73ba7ef77ac4eb610f4bb42618914f1271605751
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