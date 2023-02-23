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

  require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/widgets/LayerList",
    "esri/core/Collection"
  ], (Map, SceneView, FeatureLayer, LayerList, Collection) => {
    const featureLayer = new FeatureLayer({
      outFields: ["STATION_NAME", "COUNTRY", "TEMP"],
      portalItem: {
        // autocasts as new PortalItem()
        id: "3a177da3f6524d61980fb41125b2349c"
      },
      title: "Temperature on Jan, 4, 2017"
    });

    // When the layer is loaded, query for the extent
    // of all features in the layer that satisfy the
    // definitionExpression. Then set the view's
    // extent to the returned extent of all features.

    featureLayer.when(() => {
      featureLayer.definitionExpression = createDefinitionExpression("");
      zoomToLayer(featureLayer);
    });

    const map = new Map({
      basemap: "dark-gray-vector",
      layers: [featureLayer]
    });

    const view = new SceneView({
      container: "viewDiv",
      map: map
    });

    const layerList = new LayerList({ // widget top right handler
      view: view,
      listItemCreatedFunction: createActions
    });
    view.ui.add(layerList, "top-right");

    // definitionExpressions used by each action
    // listed in the LayerList

    const expressions = new Collection([ // setting colors of the dots
      {
        id: "75+",
        expression: "TEMP > 75"
      },
      {
        id: "50-75",
        expression: "TEMP > 50 AND TEMP <=75"
      },
      {
        id: "25-50",
        expression: "TEMP > 25 AND TEMP <=50"
      },
      {
        id: "25-",
        expression: "TEMP <= 25"
      },
      {
        id: "arctic-circle",
        expression: "LATITUDE >= 66.5"
      },
      {
        id: "north-temperate-zone",
        expression: "LATITUDE < 66.5 AND LATITUDE >= 23.5"
      },
      {
        id: "torrid-zone",
        expression: "LATITUDE < 23.5 AND LATITUDE >= -23.5"
      }
    ]);

    // When an action is triggered, the definitionExpression
    // is set on the layer and the view's extent updates
    // to match the features visible in the layer

    layerList.on("trigger-action", (event) => {
      const actionId = event.action.id;
      const layer = event.item.layer;

      const subExpression = expressions.find((item) => {
        return item.id === actionId;
      }).expression;

      const definitionExpression = createDefinitionExpression(subExpression);
      layer.definitionExpression = definitionExpression;

      zoomToLayer(layer);
    });

    function createActions(event) { // widget top right info
      const item = event.item;

      item.actionsOpen = true;
      item.actionsSections = [
        [
          {
            title: "> 75°F",
            className: "esri-icon-zoom-out-fixed",
            id: "75+"
          },
          {
            title: "50°-75°F",
            className: "esri-icon-zoom-out-fixed",
            id: "50-75"
          },
          {
            title: "25°-50°F",
            className: "esri-icon-zoom-out-fixed",
            id: "25-50"
          },
          {
            title: "< 25°F",
            className: "esri-icon-zoom-out-fixed",
            id: "25-"
          }
        ],
        [
          {
            title: "Above Arctic Circle",
            className: "esri-icon-zoom-out-fixed",
            id: "arctic-circle"
          },
          {
            title: "North Temperate Zone",
            className: "esri-icon-zoom-out-fixed",
            id: "north-temperate-zone"
          },
          {
            title: "Torrid Zone",
            className: "esri-icon-zoom-out-fixed",
            id: "torrid-zone"
          }
        ]
      ];
    }

    // Appends a definitionExpression to a base expression
    // the base expression only returns freatures in
    // Canada, USA, and Mexico. It excludes some US territories
    // located on the other side of the dateline

    function createDefinitionExpression(subExpression) { // dots creator
      const baseExpression =
        "( COUNTRY LIKE '%United States Of America%' OR " +
        "COUNTRY LIKE '%Canada%' OR " +
        "COUNTRY LIKE '%Mexico%') AND NOT" +
        "(COUNTRY LIKE '%Johnston/Wake/Xmas%' OR " +
        "COUNTRY LIKE '%Hawaii%' OR " +
        "COUNTRY LIKE '%Marshall Islands%' OR " +
        "STATION_NAME = 'Eareckson/Shemya' OR " +
        "COUNTRY LIKE '%Guam%' )";

      return subExpression ? baseExpression + " AND (" + subExpression + ")" : baseExpression;
    }

    // Zooms to the extent of the layer as defined by
    // its definitionExpression
    // This method will work for all FeatureLayers, even
    // those without a saved `fullExtent` on the service.

    function zoomToLayer(layer) {
      return layer.queryExtent().then((response) => {
        view.goTo(response.extent)
        .catch((error) => {
          console.error(error);
        });
      });
    }
  });

  //  Maps Markers

  
  
  
  // USER INTERACTIONS
    // search bar – event listener
    // recent searches – event listener
  
  
  // INITIALIZATION
    // on page load map appears and form appears
    // once local storage, recent searches appears
    // Chart appears on searech (map zoom)
