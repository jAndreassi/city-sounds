// DEPENDENCIES (DOM Elements)
// DATA / STATE / GLOBAL VARIABLES



// FUNCTIONS

// maybe not exactly right, but something like this
// var countryName = searchBar.value;

var searchBar = document.querySelector(".search-bar");
var submitButton = document.querySelector(".submit-btn");
var recentSearchesDropdown = document.querySelector(".recent-searches");
var recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
var countries = [
  "Japan",
  "Germany",
  "Russia",
  "China",
  "Colombia",
  "America",
  "Poland",
  "Nigeria"
];

var countryArr = [];

window.onload = function() {
  // on page load, renders LocalStorage
  updateRecentSearches();

  // on page load, either fetches from Deezer API, or stores its object in sessionStorage and creates countryArr
  saveDeezerObjAndCountryArr();

  // generates paired country to ID
  generateCountrIdObjArr()
}

function searchCountry(searchValue) {
  // check if the search value is valid
  if (!searchValue || !countries.includes(searchValue)) {
    return;
  }
  // // move Map to queried country
  // mapZoom(searchValue);

  // // query Deezer for playlist associated with country and render on page
  // fetchAndRenderPlaylist(searchValue);

  // save query to local storage
  addToLocalStorage(searchValue);

  // adds new localStorage to dropDown
  updateRecentSearches();

}
var searchBar = document.querySelector(".search-bar");
var countryList = document.getElementById("countryList");

// // create datalist element with countries
// for (var i = 0; i < countries.length; i++) {
//   var option = document.createElement("option");
//   option.value = countries[i];
//   countryList.appendChild(option);
// }

// // set datalist to searchBar
// searchBar.setAttribute("list", "countryList");

// add event listener to search bar for input
searchBar.addEventListener("input", function(event) {
  var searchValue = event.target.value.trim().toLowerCase();
  if (searchValue.length >= 3) {
    // filter countries by search value
    var filteredCountries = countries.filter(function(country) {
      return country.toLowerCase().startsWith(searchValue);
    });
    countryList.innerHTML = "";
    filteredCountries.forEach(function(country) {
      var option = document.createElement("option");
      option.value = country;
      countryList.appendChild(option);
    });
  } else {
    countryList.innerHTML = "";
  }
});

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
  deezerObject = JSON.parse(sessionStorage.getItem("deezerObject"));
  console.log(searchValue);


}


// adds searchValues to localStorage
function addToLocalStorage(searchValue) {
  if (searchValue.length > 0) {
    // Save search to local storage
    recentSearches.unshift(searchValue);
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }
};

// To eventually update dropdown for recentSearches – this is re-rendering all of them everytime this is called I think, which may be fine, especially if we are eventually limiting the number.
// Should add a check to make sure that it's not currently in the local storage maybe? So we don't get multiple of the same search?
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

  // Testing Deezer API

// CORS Proxy Server Using Rapid API
// deezerPlaylistUrl = "https://api.deezer.com/user/637006841/playlists&limit=100";

// const encodedParams = new URLSearchParams();
// encodedParams.append("my-url", deezerPlaylistUrl);

// const options = {
//   method: 'POST',
//   headers: {
//     'content-type': 'application/x-www-form-urlencoded',
//     'X-RapidAPI-Key': '492bbad1e0msh127b51cb43ca626p106abejsn53757b96005b',
//     'X-RapidAPI-Host': 'cors-proxy3.p.rapidapi.com'
//   },
//   body: encodedParams
// };

// getting Array of countries 


// fetch('https://cors-proxy3.p.rapidapi.com/api', options)
function saveDeezerObjAndCountryArr() {
  var deezerObject;
  if (sessionStorage.getItem("deezerObject") === null) {
    fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/user/637006841/playlists&limit=100")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        deezerObject = data;
        sessionStorage.setItem("deezerObject", JSON.stringify(data));
      })
      .then(function(){
        generateCountryArr();
      })
  } else {
    generateCountryArr();
  }
}
      
function generateCountryArr() {
  deezerObject = JSON.parse(sessionStorage.getItem("deezerObject"));
  console.log(deezerObject);
  console.log(deezerObject.data);
  playlistArr = [];
  for (i = 0; i < deezerObject.data.length; i++) {
    var playlistName = deezerObject.data[i].title;
    if (!playlistName.includes("Songcatcher") && !playlistName.includes("SongCatcher") && !playlistName.includes("Worldwide") && playlistName.includes("Top")) {
      playlistArr.unshift(playlistName)
    }
  }
  for (let i =0; i < playlistArr.length; i++) {
    var name = playlistArr[i];
    if (name.startsWith("Top ")) {
      countryArr.unshift(name.substring(4));
    }
  }
  console.log(countryArr);
}

var countryIdArr = [];

function generateCountrIdObjArr() {
  deezerObject = JSON.parse(sessionStorage.getItem("deezerObject"));
  console.log(deezerObject);
  console.log(deezerObject.data);
  playlistArr = [];
  for (i = 0; i < deezerObject.data.length; i++) {
    var playlistName = deezerObject.data[i].title;
    if (!playlistName.includes("Songcatcher") && !playlistName.includes("SongCatcher") && !playlistName.includes("Worldwide") && playlistName.includes("Top")) {
      playlistArr.unshift(playlistName)
    }
  }
  for (let i =0; i < playlistArr.length; i++) {
    var name = playlistArr[i];
    if (name.startsWith("Top ")) {
      var countryName = name.substring(4);
      countryIdArr.unshift({[countryName]: deezerObject.data[i].id})
    }
  }
  console.log(countryIdArr);
}

 


// function countryArrFromDeezer() {
//   checkDeezerStorage();
//   var deezerObject = JSON.parse(sessionStorage.getItem("deezerObject"));
//   console.log(deezerObject);
//   console.log(deezerObject.data);
//   playlistArr = [];
//   for (i = 0; i < deezerObject.data.length; i++) {
//     var playlistName = deezerObject.data[i].title;
//     if (!playlistName.includes("Songcatcher") && !playlistName.includes("SongCatcher") && !playlistName.includes("Worldwide") && playlistName.includes("Top")) {
//       playlistArr.unshift(playlistName)
//     }
//   }
//   for (let i =0; i < playlistArr.length; i++) {
//     var name = playlistArr[i];
//     if (name.startsWith("Top ")) {
//       countryArr.unshift(name.substring(4));
//     }
//   }
//   console.log(countryArr);
// }

// Map API

  //  Map to Display

  //  Maps Markers

  
  
  
  // USER INTERACTIONS
    // search bar – event listener
    // recent searches – event listener
  
  
  // INITIALIZATION
    // on page load map appears and form appears
    // once local storage, recent searches appears
    // Chart appears on searech (map zoom)
