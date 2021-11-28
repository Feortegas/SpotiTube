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

// Get Artist 
var getData = function () {
  var artist = localStorage.getItem("artist");
  for(let index=0; index < playlistArr.length; index++) {
  // Format the YouTube API url
  var apiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${artist}${playlistArr[index]}&maxResults=1&type=video&key=AIzaSyA2gSQ1nqtkt0AqrTla0h3si_c5SmquD6Q`;

  var encApoUrl = encodeURI(apiUrl);
  // Make a request to the url
  fetch(encApoUrl)
    .then(function (response) {
      //Request was successful
      if (response.ok) {
        response.json().then(function (data) {
          //console.log('line 24', data);

          if (data.items[0] && data.items[0].snippet.title.includes("(Official Music Video)") && index < 3) {

            // push to video array
            videoArr.push(data.items[0].id.videoId);
            saveVideoId();

            // insert thumbnails data into bulma css cards
            document.querySelector(`#card-${index}`).className = "card";
            document.querySelector(`#video-${index}`).setAttribute("src", data.items[0].snippet.thumbnails.default.url);
            document.querySelector(`#title-${index}`).textContent = data.items[0].snippet.title;


            // $(`#video-${index}`).append(
            //   `<h6>${data.items[0].snippet.title}</h6>`
            // );
            // $(`#video-${index}`).append(
            //   `<a href=` +
            //     "https://www.youtube.com/watch?v=" +
            //     `${data.items[0].id.videoId} target="_blank"> <img src=${data.items[0].snippet.thumbnails.default.url}></a>`
            // );
            // Playlist Insert Function call
            // playInsert(IdPlay, data.items[0].id.videoId);
          }
        
        });
      } else {
        alert("Error: YouTube User Not Found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to YouTube");
    });
}
videoArr.forEach(function(video){
    playInsert(IdPlay, video);
})
};

var saveVideoId = function() {
    localStorage.setItem("videoId", videoArr);
}

// Called After Sign In; retrieves playlist Id
var playList = function() {
    return gapi.client.youtube.playlists.list({
      "part": [
      "snippet,contentDetails"
      ],
      "maxResults": 25,
      "mine": true
    })
    .then(function (response) {
        console.log('Returns playlist data: ', response)
        IdPlay = response.result.items[0].id;
      })
      .catch(function (error) {
        console.log('catch error retrieve playlist function');
      });
  };


// Inserts Spotify Track Music Video To Playlist
  var playInsert = function(playListId, videoId) {
      console.log('99', playListId);
      console.log('100', videoId);
    return gapi.client.youtube.playlistItems.insert({
      "part": [
        "snippet"
      ],
      "resource": {
        "snippet": {
          "playlistId": playListId,
          "position": 0,
          "resourceId": {
            "kind": "youtube#video",
            "videoId": videoId
          }
        }
      }
    })
    .then(function (response) {
        console.log('Playlist creation', response)
      })
      .catch(function (error) {
        console.log('Catch error playlist insert function');
      });
  };
    