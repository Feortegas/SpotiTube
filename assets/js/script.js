// ***
// YouTube API script file
// ***

// Team Info
//Nahom's Youtube API key = 'AIzaSyAwl6OYOGUNSDQLOOk2O7KKDPHJuEI2M-I';
//Nahom's Youtube Client Id = '471819150021-lt79m6gbg9kdd9s9gk73tbboq7atp4cg.apps.googleusercontent.com'
//Krita's Youtube API key = 'AIzaSyA2gSQ1nqtkt0AqrTla0h3si_c5SmquD6Q';
//Fernando's Youtube API key = 'AIzaSyDXdnp4Wkvmkp2n9E0o8pxdTs16NXePEbU';
//Fernando Youtube Cleint Id = '272643493783-for2qk69datv1od5bevqtvb0q2g3tifr.apps.googleusercontent.com';

//Declarations
var IdPlay;
var playlistArr = [];
var artistArr = [];
var videoArr = [];
var usersPlaylistsArr = [];

// Get Artist
var getData = function () {
  var artist = localStorage.getItem("artist");
  for (let index = 0; index < playlistArr.length; index++) {
    // Format the YouTube API url
    var apiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${artist}${playlistArr[index]}&maxResults=1&type=video&key=AIzaSyAwl6OYOGUNSDQLOOk2O7KKDPHJuEI2M-I`;

    var encApoUrl = encodeURI(apiUrl);
    // Make a request to the url
    fetch(encApoUrl)
      .then(function (response) {
        //Request was successful
        if (response.ok) {
          response.json().then(function (data) {
            if (
              data.items[0] &&
              data.items[0].snippet.title.includes("(Official Music Video)") &&
              index < 3
            ) {
              // push to video array
              videoArr.push(data.items[0].id.videoId);
              saveVideoId();
              console.log('inside loop', videoArr)
              console.log(data);

            // insert thumbnails data into bulma css cards
            document.querySelector(`#card-${index}`).classList.remove("is-hidden");
            $(`#video-${index}`).attr("src", data.items[0].snippet.thumbnails.default.url);
            $(`#title-${index}`).html(data.items[0].snippet.title);
            document.querySelector("#insert-youtube").classList.remove("is-hidden");
            }
          })
        } else {
          alert("Error: YouTube User Not Found");
            playlistArr = [];
            artistArr = [];
            console.log('else block', playlistArr);
            console.log('else block 2', artistArr);
        }
      })
      .catch(function (error) {
        alert("Unable to connect to YouTube");
      })
  }

};

var saveVideoId = function () {
  localStorage.setItem("videoId", videoArr);
  console.log('64', videoArr);
};

// Called After Sign In; retrieves playlist Id
var playList = function () {
  return gapi.client.youtube.playlists
    .list({
      part: ["snippet,contentDetails"],
      maxResults: 25,
      mine: true,
    })
    .then(function (response) {
      IdPlay = response.result.items[0].id;
    })
    .catch(function (error) {
      console.log("catch error retrieve playlist function");
    });
};

// Inserts Spotify Track Music Video To Playlist
var playInsert = function (playListId, videoId) {
  return gapi.client.youtube.playlistItems
    .insert({
      part: ["snippet"],
      resource: {
        snippet: {
          playlistId: playListId,
          position: 0,
          resourceId: {
            kind: "youtube#video",
            videoId: videoId,
          },
        },
      },
    })
    .then(function (response) {
      console.log("Playlist creation", response);
    })
    .catch(function (error) {
      console.log("Catch error playlist insert function");
    });
};

// Insert Music Videos to YouTube Playlist button event listener
document.querySelector("#insert-youtube").addEventListener("click", function(){
  for (let index = 0; index < videoArr.length; index++) {
      playInsert(IdPlay, videoArr[index]);
  }
  
  document.querySelector("#insert-youtube").classList.add("is-hidden");
});