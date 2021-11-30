// ***
// Spotify API script file
// ***

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
    var artistName = playlist.tracks.items[0].track.artists[0].name;
    artistArr.push(artistName);
    // dynamically greate track list
    for (let index = 0; index < 5; index++) {
        //console.log(playlist.tracks.items[index].track.name);
        var trackName = playlist.tracks.items[index].track.name;

        var trackEl = document.createElement("li");
        trackEl.textContent = trackName;
        tracksEl.appendChild(trackEl);

        playlistArr.push(trackName);
        saveSpotify();
        //getData(playlist.tracks.items[index].track.artists[0].name, playlist.tracks.items[index].track.name, index);
    }
    getData();
};

// function for local storage 
var saveSpotify = function() {
    localStorage.setItem("artist", artistArr);
    localStorage.setItem("tracks", playlistArr);
}

// search Spotify for Playlist
var searchSpotifyHandler = function() {
    // prevent page from refreshing
    // event.preventDefault();
    console.log('click is working');
        clearStorage();

        var playlistNameEl = document.querySelector("#search-text");

        // get value from input element
        var playlistName = playlistNameEl.value.trim();

        if (playlistName) {
            tracksEl.innerHTML = "";
           
            $(".video-div").each(function () {
                console.log($(this));
                $(this).addClass("is-hidden");
                //$(this).show();
            });
            playlistNameEl.value = "";
            getSpotifyApiData(playlistName);

        }
        else {
            alert("Please enter a valid Artist name");
        }
};

// Clear Local Storage function 
var clearStorage = function() {
    localStorage.removeItem('artist');
    localStorage.removeItem('tracks');
    localStorage.removeItem('videoId');
}

document.querySelector("#search-spotify").addEventListener("click", searchSpotifyHandler);