const clientId = '';
const clientSecret = '';
var searchFormEl = document.querySelector("#form-sidebar");
var playListId = "";


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
            alert("Error: whatever the error is");
        }
        })
        .catch(function(error) {
            alert("Error: unable to connect to Spotify");
        });

};

// get playlist
var _getPlaylist = function(_token, _playListId) {

    console.log("Line 37: " + playListId);

    const playlists = fetch("https://api.spotify.com/v1/playlists/" + _playListId, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + _token}
    }).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        } else {
            alert("Error: whatever the error is");
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

// Form event handler - TEMPORARY HTML
var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

        var artistNameEl = document.querySelector("#form-search-artist");

        // get value from input element
        var artistName = artistNameEl.value.trim();

        if (artistName) {
            getSpotifyApiData(artistName);
            artistNameEl.value = "";
        }
        else {
            alert("Pleasej enter a valid Artist name");
        }
};

// getSpotifyApiData();

searchFormEl.addEventListener("submit", formSubmitHandler);