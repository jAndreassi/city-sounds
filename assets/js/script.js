// FUNCTIONS

var searchBar = document.querySelector(".search-bar");
var submitButton = document.querySelector(".submit-btn");
var recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];

var countryArr = [];
var countryIdArr = [];
var countryObjArr = [];

window.onload = function() {
  // on page load, renders LocalStorage
  updateRecentSearches();

  // on page load, either fetches from Deezer API, or stores its object in sessionStorage and creates countryArr and countryIdArr
  // also calls the map and creates the markers
  fetchFromDeezerAndLoadFullMap();

}

function searchCountry(searchValue) {
  // check if the search value is valid
  if (!searchValue || !countryArr.includes(searchValue)) {
    return;
  }
  // query Deezer for playlist associated with country and render on page
  fetchAndRenderPlaylist(searchValue);

  // save query to local storage
  addToLocalStorage(searchValue);

  // adds new localStorage to dropDown
  updateRecentSearches();

  // gets latitude and longitude for queried countries
  var latLonObj = getLatAndLon(searchValue);

  // move Map to queried country
  mapZoom(latLonObj.lat, latLonObj.lon);
}

var searchBar = document.querySelector(".search-bar");
var countryList = document.getElementById("countryList");

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
      var playlistChart = document.querySelector("#deezer-songs");

      var thead = document.querySelector(".playlist-header");
      thead.innerHTML = 
      `<tr>
        <th class="has-text-left">Song</th>
        <th class="has-text-left">Duration</th>
        <th class="has-text-left">Artist</th>
        <th class="has-text-left">Link</th>
      </tr>`
      
      // for loop to pull top 10 song track info
      for (let i = 0; i < 10; i++) {
        var songName = data.tracks.data[i].title;
        var songDuration = data.tracks.data[i].duration;
        var songArtist = data.tracks.data[i].artist.name;
        var songLink = data.tracks.data[i].link;
        var minutes = Math.floor(songDuration / 60).toString();
        var rawSeconds = songDuration % 60;
        var seconds = rawSeconds.toString().padStart(2, '0');
        var songLength = `${minutes}:${seconds}`;

        // if statement to check if playlist chart needs to be erased on first iteration
        if (playlistChart.innerHTML.trim() !== "" && i === 0) {
          playlistChart.innerHTML = "";
        }

        // update playlist header
        var title = document.querySelector('.chart-title');
        title.textContent = `Top 10 Songs in ${searchValue}`;

        // creation of playlist info on page
        var tr = document.createElement("tr");
        tr.setAttribute("class", "hover-effect");
        var tdName = document.createElement("td");
        tdName.setAttribute("class", "song-name has-text-left");
        var tdLength = document.createElement("td");
        tdLength.setAttribute("class", "song-duration has-text-left");
        var tdArtist = document.createElement("td");
        tdArtist.setAttribute("class", "song-artist has-text-left");
        var tdLink = document.createElement("td");
        tdLink.setAttribute("class", "song-link has-text-centered");
        
        tdName.innerHTML = `${songName}`
        tdLength.innerHTML = `${songLength}`
        tdArtist.innerHTML = `${songArtist}`
        tdLink.innerHTML = `<a href="${songLink}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-headphones-simple"></i></a>`
       

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

// To update dropdown for recentSearches
function updateRecentSearches() {
  var dropdownContent = document.querySelector('.dropdown-content');
  dropdownContent.innerHTML = '';
  var recentSearchesLimited = recentSearches.slice(0, 5);
  for (let i = 0; i < recentSearchesLimited.length; i++) {
    var recentSearch = recentSearchesLimited[i];
    var link = document.createElement('a');
    link.classList.add('dropdown-item');
    link.textContent = recentSearch;
    dropdownContent.appendChild(link);
  }
}

// event listener to activate recent searches dropdown
var dropdown = document.querySelector(".dropdown");
dropdown.addEventListener("click", function () {
  dropdown.classList.toggle('is-active');
});

// event listener with delegation to allow clicking on the recent searches
var dropdownContent = document.querySelector(".dropdown-content");
dropdownContent.addEventListener("click", function (event) {
  var searchValue = event.target.textContent;
  searchBar.value = searchValue;
  searchCountry(searchValue);
  });
  

// API GRABS

// Deezer

// this function check if the deezer API data is stored in session Storage. If not it fetches it and then calls the generate CountryArrays function, if so, it just calls the same function
function fetchFromDeezerAndLoadFullMap() {
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
        mapMarkers();
        loadMap();
      })
  } else {
    generateCountryArrays();
    mapMarkers();
    loadMap();
  }
}

// this function takes the saved DeezerObject in session storage and manipulates the data. 
function generateCountryArrays() {
  deezerObject = JSON.parse(sessionStorage.getItem("deezerObject"));
  var playlistArr = [];
  var playlistId = [];
  for (let i = 0; i < deezerObject.data.length; i++) {
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
  // makes the array of objects that pairs country and id
  for (let z = 0; z < countryArr.length; z++) {
    var countryIdObj = {"country": countryArr[z], "id": playlistId[z]};
    countryIdArr.push(countryIdObj);
  }
}

// gets individual lat and lons as numbers
function getLatAndLon(searchValue) {
  lat = Number(countryData[searchValue].lat);
  lon = Number(countryData[searchValue].lon);
  return {lat, lon} 
}

// creates array of all objects for map markers
function mapMarkers() {
  for (i = 0; i < countryArr.length; i++) {
    var myCoords = getLatAndLon(countryArr[i]);
    let lat = myCoords.lat;
    let lon = myCoords.lon;
    let name = countryArr[i];

    let countryObj = {lat, lon, name}
    countryObjArr.push(countryObj);
  }
}


// Map API

//  Map to Display
function loadMap() {
  require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
  ], (Map, SceneView, FeatureLayer) => {

    const featureLayer = new FeatureLayer({
      outFields: ["*"],
      source: countryObjArr.map((d, i) => (
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
                size: 10,
                family: "CalciteWebCoreIcons"
            }
        }
      },
    });

    const map = new Map({
      basemap: "dark-gray-vector",
      layers: [featureLayer], // loads layer with all of the markers
    });

    const view = new SceneView({
      container: "viewDiv",
      map: map,
      center: [1000, 20],
      ui: {
        components: ["attribution"]
      }
    });
    view.ui._removeComponents(["attribution"]); // removes footer
    // disable all zooming options below
    view.on("mouse-wheel", function(event) {
      event.stopPropagation();
    });
    view.on("double-click", function(event) {
      event.stopPropagation();
    });
    view.on("double-click", ["Control"], function(event) {
      event.stopPropagation();
    });
    view.on("mouse-wheel", function(event){
      // prevents zooming with the mouse-wheel event
      event.stopPropagation();
    });

    // location finders below
    // COORDINATES TO BOUNCE TO are lat and lon

    function customEasing(t) {
      return 1 - Math.abs(Math.sin(-1.7 + t * 1 * Math.PI)) * Math.pow(0.5, t * 10);
    }

    // document.getElementById("bounceBerlin").addEventListener("click", () => {
    window.mapZoom = function(lat, lon) {

      view
        .goTo(
          {
            position: {
              x: lon,
              y: lat,
              z: 5000000,
              spatialReference: {
                wkid: 4326
              }
            },
            heading: 0,
            tilt: 0
          },
          {
            speedFactor: 0.8,
            easing: customEasing
          }
        )
        .catch(function(error) {
        if (error.name != "AbortError") {
           console.error(error);
        }
      });
    }
  });
}
