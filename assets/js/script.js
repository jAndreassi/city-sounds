// DEPENDENCIES (DOM Elements)
// DATA / STATE / GLOBAL VARIABLES



// FUNCTIONS

var searchBar = document.querySelector(".search-bar");
var submitButton = document.querySelector(".submit-btn");
var recentSearchesDropdown = document.querySelector(".dropdown-trigger");
var recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
// var countries = [
//   "Japan",
//   "Germany",
//   "Russia",
//   "China",
//   "Colombia",
//   "America",
//   "Poland",
//   "Nigeria"
// ];

var countryArr = [];
var countryIdArr = [];

window.onload = function() {
  // on page load, renders LocalStorage
  updateRecentSearches();

  // on page load, either fetches from Deezer API, or stores its object in sessionStorage and creates countryArr and countryIdArr
  saveDeezerObjAndCountryArr();
}

function searchCountry(searchValue) {
  // check if the search value is valid
  if (!searchValue || !countryArr.includes(searchValue)) {
    return;
  }
  // // move Map to queried country
  // mapZoom(searchValue);

  // // query Deezer for playlist associated with country and render on page
  fetchAndRenderPlaylist(searchValue);

  // save query to local storage
  addToLocalStorage(searchValue);

  // adds new localStorage to dropDown
  updateRecentSearches();
}

var searchBar = document.querySelector(".search-bar");
var countryList = document.getElementById("countryList");

// // create datalist element with countryArr
// for (var i = 0; i < countryArr.length; i++) {
//   var option = document.createElement("option");
//   option.value = countryArr[i];
//   countryList.appendChild(option);
// }

// // set datalist to searchBar
searchBar.setAttribute("list", "countryList");

// add event listener to search bar for input
searchBar.addEventListener("input", function(event) {
  var searchValue = event.target.value.trim().toLowerCase();
  if (searchValue.length >= 3) {
    // filter countries by search value
    var filteredCountries = countryArr.filter(function(country) {
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

//Multi-Step function. Probably would break this down, but had issues with variable scoping
// First searches the countryIdArr to find the id for the appropriate playlist from the searchValue
function fetchAndRenderPlaylist(searchValue) {
  deezerObject = JSON.parse(sessionStorage.getItem("deezerObject"));
  var objLocation = countryIdArr.find(function(x) {
    return x.country === searchValue
  })

  if (objLocation) {
    var searchId = objLocation.id;   
  }
  searchId = searchId.toString()
// dynamically adds searchId to request URL
  var requestPlaylistUrl = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/${searchId}`

  // requests playlist infor from deezer
  fetch(requestPlaylistUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      var playlistChart = document.querySelector("#deezer-songs");
      // for loop to pull top 10 song track info
      for (i = 0; i < 10; i++) {
        var songName = data.tracks.data[i].title;
        var songDuration = data.tracks.data[i].duration;
        var songArtist = data.tracks.data[i].artist.name;
        var songLink = data.tracks.data[i].link;
        console.log(songName);
        console.log(songDuration);
        console.log(songArtist);
        console.log(songLink);
        var minutes = Math.floor(songDuration / 60);
        var seconds = songDuration % 60;
        var songLength = `${minutes}:${seconds}`;
        console.log(songLength);

        // if statement to check if playlist chart needs to be erased on first iteration
        if (playlistChart.innerHTML.trim() !== "" && i === 0) {
          playlistChart.innerHTML = "";
        }

        // creation of playlist info on page
        var tr = document.createElement("tr");
        var tdName = document.createElement("td");
        tdName.setAttribute("class", "song-name");
        var tdLength = document.createElement("td");
        tdLength.setAttribute("class", "song-duration");
        var tdArtist = document.createElement("td");
        tdArtist.setAttribute("class", "song-artist");
        var tdLink = document.createElement("td");
        tdLink.setAttribute("class", "song-link");
        
        tdName.innerHTML = `${songName}`
        tdLength.innerHTML = `${songLength}`
        tdArtist.innerHTML = `${songArtist}`
        tdLink.innerHTML = `<a href="${songLink}" target="_blank" rel="noopener noreferrer">Listen here!</a>`


        playlistChart.appendChild(tr);
        tr.appendChild(tdName);
        tr.appendChild(tdLength);
        tr.appendChild(tdArtist);
        tr.appendChild(tdLink);
      } 
    })
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
  var dropdownContent = document.querySelector('.dropdown-content');
  dropdownContent.innerHTML = '';
  var recentSearchesLimited = recentSearches.slice(0, 5);
  for (var i = 0; i < recentSearchesLimited.length; i++) {
    var recentSearch = recentSearchesLimited[i];
    var link = document.createElement('a');
    link.classList.add('dropdown-item');
    link.textContent = recentSearch;
    dropdownContent.appendChild(link);
  }
}

document.addEventListener("click", function (event) {
  var dropdownTrigger = document.querySelector(".dropdown-trigger");
  var dropdownMenu = document.querySelector("#dropdown-trigger");
  if (
    !dropdownTrigger.contains(event.target) &&
    !dropdownMenu.contains(event.target)
  ) {
    dropdownMenu.classList.remove("is-active");
  }
});

var dropdownItems = document.querySelectorAll(".dropdown-item");
dropdownItems.forEach(function (item) {
  item.addEventListener("click", function (event) {
    dropdownMenu.classList.remove("is-active");
  });
});

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
// this function check if the deezer API data is stored in session Storage. If not it fetches it and then calls the generate CountryArrays function, if so, it just calls the same function
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
        generateCountryArrays();
      })
  } else {
    generateCountryArrays();
  }
}

// this function takes the saved DeezerObject in session storage and manipulates the data. 
function generateCountryArrays() {
  deezerObject = JSON.parse(sessionStorage.getItem("deezerObject"));
  var playlistArr = [];
  var playlistId = [];
  for (i = 0; i < deezerObject.data.length; i++) {
    var playlistName = deezerObject.data[i].title;
    // filtering for only playlists that are Top Country playlists and grabs those playlist names and their playlist IDs
    if (!playlistName.includes("Songcatcher") && !playlistName.includes("SongCatcher") && !playlistName.includes("Worldwide") && playlistName.includes("Top")) {
      playlistArr.unshift(playlistName)
      playlistId.unshift(deezerObject.data[i].id);
    }
  }
  // filters the playlist names and makes an array of just country names
  for (let i = 0; i < playlistArr.length; i++) {
    var name = playlistArr[i];
    if (name.startsWith("Top ")) {
      countryArr.push(name.substring(4));
    }
  }
  console.log(countryArr);
  // makes the array of objects that pairs country and id
  for (let z = 0; z < countryArr.length; z++) {
    var countryIdObj = {"country": countryArr[z], "id": playlistId[z]};
    countryIdArr.push(countryIdObj);
  }
  console.log(countryIdArr);
}


// Map API

  //  Map to Display

  require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
  ], (Map, SceneView, FeatureLayer) => {
    // const featureLayer = new FeatureLayer({
    //   outFields: ["STATION_NAME", "COUNTRY", "TEMP"],
    //   portalItem: {
    //     // autocasts as new PortalItem()
    //     id: "3a177da3f6524d61980fb41125b2349c"
    //   },
    //   title: "Temperature on Jan, 4, 2017"
    // });

    const data = [
      {
          lat: 32.727482,
          lon: -117.1560632,
          name: "Automotive Museum",
      },
    ];

    const featureLayer = new FeatureLayer({
      outFields: ["*"],
      source: data.map((d, i) => (
        {
            geometry: {
                type: "point",
                longitude: d.lon,
                latitude: d.lat
            },
            attributes: {
                ObjectID: i,
                ...d
            }
        }
      )),
      objectIdField: "ObjectID",
      geometryType: "point",
      renderer: {
        type: "simple",
        symbol: {
            type: "text",
            color: "white",
            text: "\ue6a2",
            font: {
                size: 30,
                family: "CalciteWebCoreIcons"
            }
        }
    },
    });

    const map = new Map({
      basemap: "dark-gray-vector",
      layers: [featureLayer], // dots layer
    });

    const view = new SceneView({
      container: "viewDiv",
      map: map,
      center: [1000 , 20],
      ui: {
        components: ["attribution"]
      }
    });
  });

  //  Maps Markers

  
  
  
  // USER INTERACTIONS
    // search bar – event listener
    // recent searches – event listener
  
  
  // INITIALIZATION
    // on page load map appears and form appears
    // once local storage, recent searches appears
    // Chart appears on searech (map zoom)
