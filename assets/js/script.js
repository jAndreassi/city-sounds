

// DEPENDENCIES (DOM Elements)
// DATA / STATE / GLOBAL VARIABLES



// FUNCTIONS

var searchBar = document.querySelector(".search-bar");
var submitButton = document.querySelector(".submit-btn");
var recentSearchesDropdown = document.querySelector(".dropdown-trigger");
var recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];

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
  // query Deezer for playlist associated with country and render on page
  fetchAndRenderPlaylist(searchValue);

  // save query to local storage
  addToLocalStorage(searchValue);

  // adds new localStorage to dropDown
  updateRecentSearches();

  // gets latitude and longitude for queried countries
  var latLonObj = getLatAndLon(searchValue);
  console.log(latLonObj);

  // move Map to queried country
  mapZoom(latLonObj.lat, latLonObj.lon);
}

var searchBar = document.querySelector(".search-bar");
var countryList = document.getElementById("countryList");

// // create datalist element with countryArr
// for (let i = 0; i < countryArr.length; i++) {
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
// function mapZoom()


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
      for (let i = 0; i < 10; i++) {
        var songName = data.tracks.data[i].title;
        var songDuration = data.tracks.data[i].duration;
        var songArtist = data.tracks.data[i].artist.name;
        var songLink = data.tracks.data[i].link;
        console.log(songName);
        console.log(songDuration);
        console.log(songArtist);
        console.log(songLink);
        var minutes = Math.floor(songDuration / 60).toString();
        var rawSeconds = songDuration % 60;
        var seconds = rawSeconds.toString().padStart(2, '0');
        var songLength = `${minutes}:${seconds}`;
        console.log(songLength);

        // if statement to check if playlist chart needs to be erased on first iteration
        if (playlistChart.innerHTML.trim() !== "" && i === 0) {
          playlistChart.innerHTML = "";
        }

        // update playlist header
        var title = document.querySelector('.chart-title');
        title.textContent = `Top 10 Songs in ${searchValue}`;

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
        tdLink.innerHTML = `<a href="${songLink}" target="_blank" rel="noopener noreferrer"><img class="sound-on" src="./assets/images/music-note.svg" /></a>`
       

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
  for (let i = 0; i < recentSearchesLimited.length; i++) {
    var recentSearch = recentSearchesLimited[i];
    console.log(link)
    var link = document.createElement('a');
    link.classList.add('dropdown-item');
    link.textContent = recentSearch;
    dropdownContent.appendChild(link);
    // link.innerHTML(recentSearches)
  }
}


var dropdown = document.querySelector(".dropdown");
dropdown.addEventListener("click", function (event) {
  var dropdownMenu = document.querySelector("#dropdown-menu");

  dropdown.classList.toggle('is-active');
  // if (
  //   !dropdown.contains(event.target) &&
  //   !dropdownMenu.contains(event.target)
  // ) {
  //   dropdownMenu.classList.remove("is-active");
  // }
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
  console.log(countryArr);
  // makes the array of objects that pairs country and id
  for (let z = 0; z < countryArr.length; z++) {
    var countryIdObj = {"country": countryArr[z], "id": playlistId[z]};
    countryIdArr.push(countryIdObj);
  }
  console.log(countryIdArr);
}

function getLatAndLon(searchValue) {
  lat = Number(countryData[searchValue].lat);
  lon = Number(countryData[searchValue].lon);
  console.log(lat);
  console.log(lon);
  return {lat, lon} 
}

// Map API

  //  Map to Display

  require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
  ], (Map, SceneView, FeatureLayer) => {

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
  
  
  // USER INTERACTIONS
    // search bar – event listener
    // recent searches – event listener
  
  
  // INITIALIZATION
    // on page load map appears and form appears
    // once local storage, recent searches appears
    // Chart appears on searech (map zoom)
