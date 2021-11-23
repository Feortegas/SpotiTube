//Nahom's API key = 'AIzaSyAwl6OYOGUNSDQLOOk2O7KKDPHJuEI2M-I';
//Krita's API key = 'AIzaSyA2gSQ1nqtkt0AqrTla0h3si_c5SmquD6Q';
//Fernando's API key = 'AIzaSyDXdnp4Wkvmkp2n9E0o8pxdTs16NXePEbU';
//{"web":{"client_id":"471819150021-lt79m6gbg9kdd9s9gk73tbboq7atp4cg.apps.googleusercontent.com","project_id":"my-project-007-332423","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"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","redirect_uris":["http://localhost"]}}
var searchInput = document.querySelector("#artistId");
//https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&onBehalfOfContentOwnerChannel=UCkDDetCtGc5_qOu9kNjVShw&key=AIzaSyA2gSQ1nqtkt0AqrTla0h3si_c5SmquD6Q  Playlist API
//`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel}&maxResults=5&order=date&key=AIzaSyAwl6OYOGUNSDQLOOk2O7KKDPHJuEI2M-I`



// Get Artist *working*
var getData = function(artist, song, index) {
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

            if ((data.items[0].snippet.title).includes("(Official Music Video)")) {
 
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
var getChannel = function (channel) {
    //Format the YouTube API url

    console.log(channel);
};
