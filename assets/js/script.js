//Nahom's API key = 'AIzaSyAwl6OYOGUNSDQLOOk2O7KKDPHJuEI2M-I';
//Nahom's Youtube Client Id = '471819150021-lt79m6gbg9kdd9s9gk73tbboq7atp4cg.apps.googleusercontent.com'
//Krita's API key = 'AIzaSyA2gSQ1nqtkt0AqrTla0h3si_c5SmquD6Q';
//Fernando's API key = 'AIzaSyDXdnp4Wkvmkp2n9E0o8pxdTs16NXePEbU';
//Fernando Youtube Cleint Id = '272643493783-for2qk69datv1od5bevqtvb0q2g3tifr.apps.googleusercontent.com';
//Playlist API = https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&onBehalfOfContentOwnerChannel=UCkDDetCtGc5_qOu9kNjVShw&key=[YOUR_API_KEY]
var searchInput = document.querySelector("#artistId");
//https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&onBehalfOfContentOwnerChannel=UCkDDetCtGc5_qOu9kNjVShw&key=AIzaSyA2gSQ1nqtkt0AqrTla0h3si_c5SmquD6Q  Playlist API
//`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel}&maxResults=5&order=date&key=AIzaSyAwl6OYOGUNSDQLOOk2O7KKDPHJuEI2M-I`

// Get Artist *working*
var getData = function (artist, song, index) {
  // Format the YouTube API url
  var apiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${artist}${song}&maxResults=1&type=video&key=AIzaSyAwl6OYOGUNSDQLOOk2O7KKDPHJuEI2M-I`;

  var encApoUrl = encodeURI(apiUrl);
  // console.log(encApoUrl);
  // Make a request to the url
  fetch(encApoUrl)
    .then(function (response) {
      //Request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);

          if (data.items[0].snippet.title.includes("(Official Music Video)")) {
            $(`#video-${index}`).append(
              `<h6>${data.items[0].snippet.title}</h6>`
            );
            $(`#video-${index}`).append(
              `<a href=` +
                "https://www.youtube.com/watch?v=" +
                `${data.items[0].id.videoId} target="_blank"> <img src=${data.items[0].snippet.thumbnails.default.url}></a>`
            );
          } else {
            console.log(
              "Track: " +
                data.items[0].snippet.title +
                " does not have a Official Video Clip"
            );
          }
        });
      } else {
        alert("Error: YouTube User Not Found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to YouTube");
    });
};

/*var playList = function(channelId){
    //Format playlist URL
    apiURL = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&onBehalfOfContentOwnerChannel=${channelId}&key=AIzaSyAwl6OYOGUNSDQLOOk2O7KKDPHJuEI2M-I`;

    var encodePlaylist = encodePlaylist(apiUrl);
    console.log(encodePlaylist);
    // Make a request to the url
    fetch(encodePlaylist)
      .then(function (response) {
        //Request was successful
        if(response.ok) {
            response.json().then(function(data) {
                console.log('Line 58', data);
            });
        } else {
            alert("Error: Playlist not found.");
        }
    })
    .catch(function(error) {
        alert("Error: unable to connect to Spotify");
    });
}*/

function playList(channelId) {
  return gapi.client.youtube.playlists
    .insert({
      part: ["snippet"],
      onBehalfOfContentOwnerChannel: channelId,
      resource: {},
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}

// search YouTube API for Videos by Channel Name and Embeddable videos only
var getChannel = function () {
  //console.log(channel);
  //Format the YouTube API url
  gapi.client.youtube.channels
    .list({
      part: ["snippet,contentDetails,statistics"],
      mine: true,
    })
    .then(function (response) {
      console.log("line 78", response.result.items[0].id);
      playList(response.result.items[0].id);
    })
    .catch(function (error) {
      alert("No Channel By That Name");
    });
};
