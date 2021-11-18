const clientId = '742933e984264544aeda659ff45f37e3';
const clientSecret = 'aa6f5be1e16f4f048536bec5198d8a75';
const playlistId = '37i9dQZF1DX4wta20PHgwo';



var getSpotifyApiData = function() {
    
    const spotify_api_url = 'https://api.spotify.com/v1/playlists/' + playlistId;

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
                console.log(data.access_token);
                _getPlaylist(data.access_token);
            });
        } else {
            alert("Error: whatever the error is");
        }
        })
        .catch(function(error) {
            alert("Error: unable to connect to Spotify");
        });

    // const data = token.json();
    // token =  data.access_token;

    
};

// get playlist
var _getPlaylist = function(_token) {

    const playlists = fetch("https://api.spotify.com/v1/playlists/37i9dQZF1DX4wta20PHgwo", {
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

    console.log(playlists);

};

getSpotifyApiData();