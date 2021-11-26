// Declarations
const clientId = '742933e984264544aeda659ff45f37e3';
const clientSecret = 'fad863044e2045feb5d32139ded127c3';
var searchFormEl = document.querySelector(".btn-info");
var h1El = document.querySelector("#playlist-name");
var coverEl = document.querySelector("#playlist-cover");
var tracksEl = document.querySelector("#song-list");
var playListId = "";
var defaultChannel = 'Nahom_Assefa';

//console.log(document.querySelectorAll('.container'));

// Get Token
var getSpotifyApiData = function(theSearch) {

    // get token
    const token = fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    }).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                _searchForItem(data.access_token, theSearch);
            });
        } else {
            alert("Error: unable to load data from Spotify");
        }
        })
        .catch(function(error) {
            alert("Error: unable to connect to Spotify");
        });

};

// get playlist
var _getPlaylist = function(_token, _playListId) {

    const playlists = fetch("https://api.spotify.com/v1/playlists/" + _playListId, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + _token}
    }).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                //console.log(data);
                _createTrackList(data);
            });
        } else {
            alert("Error: unable to load data from Spotify");
        }
      })
      .catch(function(error) {
          alert("Error: unable to connect to Spotify");
      });

};

// Search for Item
var _searchForItem = function(_token, _theSearch) {

    const result = fetch('https://api.spotify.com/v1/search?q=' + _theSearch + '&type=playlist&limit=1', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + _token}
    }).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                playListId = data.playlists.items[0].id;
                _getPlaylist(_token, playListId);
            });
        } else {
            alert("Error: Playlist not found.");
        }
    })
    .catch(function(error) {
        alert("Error: unable to connect to Spotify");
    });
    
};

// create track list in the html dynamicaly
var _createTrackList = function(playlist) {
    // update h1 element with Playlist name
    h1El.textContent = playlist.name;
    coverEl.setAttribute("src", playlist.images[0].url);
    // dynamically greate track list
    //playlist.tracks.total
    for (let index = 0; index < 10; index++) {
        //console.log(playlist.tracks.items[index].track.name);
        var trackName = playlist.tracks.items[index].track.name;

        var trackEl = document.createElement("li");
        trackEl.textContent = trackName;
        tracksEl.appendChild(trackEl);

        getData(playlist.tracks.items[index].track.artists[0].name, playlist.tracks.items[index].track.name, index);

    }
};

// Form event handler - TEMPORARY HTML
var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

        var artistNameEl = document.querySelector("#artistId");

        // get value from input element
        var artistName = artistNameEl.value.trim();

        if (artistName) {
            tracksEl.innerHTML = "";
            document.querySelectorAll(".video-div").forEach(function(el) {el.innerHTML=""});
            artistNameEl.value = "";
            getSpotifyApiData(artistName);

        }
        else {
            alert("Please enter a valid Artist name");
        }
};

searchFormEl.addEventListener("click", formSubmitHandler);