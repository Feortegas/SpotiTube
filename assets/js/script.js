//Nahom's API key = 'AIzaSyAwl6OYOGUNSDQLOOk2O7KKDPHJuEI2M-I';
//Krita's API key = 'AIzaSyA2gSQ1nqtkt0AqrTla0h3si_c5SmquD6Q';
//Fernando's API key = 'AIzaSyDXdnp4Wkvmkp2n9E0o8pxdTs16NXePEbU';
var searchInput = document.querySelector('#artistId')
//https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&onBehalfOfContentOwnerChannel=UCkDDetCtGc5_qOu9kNjVShw&key=AIzaSyA2gSQ1nqtkt0AqrTla0h3si_c5SmquD6Q  Playlist API
//`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel}&maxResults=5&order=date&key=AIzaSyAwl6OYOGUNSDQLOOk2O7KKDPHJuEI2M-I`


// Get Artist *working*
var getData = function(artist, song, index) {
    // Format the YouTube API url
    var apiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${artist}${song}&maxResults=1&type=video&key=AIzaSyDXdnp4Wkvmkp2n9E0o8pxdTs16NXePEbU`;

    var encApoUrl = encodeURI(apiUrl);
    // console.log(encApoUrl);
    // Make a request to the url
    fetch(encApoUrl)
      .then(function (response) {
        //Request was successful
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);

            if ((data.items[0].snippet.title).includes("(Official Music Video)")) {
              var thumbnailEl = document.createElement("div");
              thumbnailEl.id = "video-"+index;
              thumbnailEl.classList = "container inline";
              document.querySelector("#videowrapper").appendChild(thumbnailEl);
  
              $(`#video-${index}`).append(`<h6>${data.items[0].snippet.title}</h6>`);
              $(`#video-${index}`).append(`<a href=` + "https://www.youtube.com/watch?v=" + `${data.items[0].id.videoId} target="_blank"> <img src=${data.items[0].snippet.thumbnails.default.url}></a>`);

            } else {
              console.log("Track: " + data.items[0].snippet.title + " does not have a Official Video Clip");
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

// search YouTube API for Videos by Channel Name and Embeddable videos only
var searchByChannelName = function() {

};

