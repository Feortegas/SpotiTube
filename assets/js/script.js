//Nahom's API key = 'AIzaSyAwl6OYOGUNSDQLOOk2O7KKDPHJuEI2M-I';
//Krita's API key = 'AIzaSyA2gSQ1nqtkt0AqrTla0h3si_c5SmquD6Q';
var searchInput = document.querySelector('#artistId')
//https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&onBehalfOfContentOwnerChannel=UCkDDetCtGc5_qOu9kNjVShw&key=AIzaSyA2gSQ1nqtkt0AqrTla0h3si_c5SmquD6Q  Playlist API
//`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel}&maxResults=5&order=date&key=AIzaSyAwl6OYOGUNSDQLOOk2O7KKDPHJuEI2M-I`


// Get Artist *working*
var getData = function(artist, song, index) {
    // Format the YouTube API url
    var apiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${artist}${song}&maxResults=1&type=video&key=AIzaSyAwl6OYOGUNSDQLOOk2O7KKDPHJuEI2M-I`;

    var encApoUrl = encodeURI(apiUrl);
    console.log(encApoUrl);
    // Make a request to the url
    fetch(encApoUrl)
      .then(function (response) {
        //Request was successful
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);

            var thumbnailEl = document.createElement("div");
            thumbnailEl.id = "video-"+index;
            thumbnailEl.classList = "container inline";
            document.querySelector("#videowrapper").appendChild(thumbnailEl);

            $(`#video-${index}`).append(`<h6>${data.items[0].snippet.title}</h6>`);
            $(`#video-${index}`).append(`<a href=` + "https://www.youtube.com/watch?v=" + `${data.items[0].id.videoId} target="_blank"> <img src=${data.items[0].snippet.thumbnails.default.url}></a>`);
          });
        } else {
          alert("Error: YouTube User Not Found");
        }
      })
      .catch(function (error) {
        alert("Unable to connect to YouTube");
      });
  };
    






// Get Artist 
var createPlaylist = function() {
  // Format the github API url
  var apiUrl = `https://youtube.googleapis.com/youtube/v3/playlists?part=id&onBehalfOfContentOwnerChannel=UCkDDetCtGc5_qOu9kNjVShw&key=AIzaSyA2gSQ1nqtkt0AqrTla0h3si_c5SmquD6Q`;
  console.log(apiUrl);
  // Make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      //Request was successful
      if (response.ok) {
        response.json().then(function (data) {
         console.log(data);
        /*for (i=0; i < data.items.length; i++) {
            $(`#video-${i}`).append(`<h6>${data.items[i].snippet.title}</h6>`);
            $(`#video-${i}`).append(`<a href=` + "https://www.youtube.com/watch?v=" + `${data.items[i].id.videoId} target="_blank"> <img src=${data.items[i].snippet.thumbnails.default.url}></a>`);
        }*/
        });
      } else {
        alert("Error: GitHub User Not Found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to GitHub");
    });
};


var userInput = function() {
    $(".btn-info").on('click', function(event){
        event.preventDefault();
        if (searchInput) {
          var artist = $('#artistId').val();
          getData(artist);
          searchInput.value = '';
        }
        else {
          alert('Please enter a seach input')
        }
    });
};


var embedVideo = function (param) {

  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'u9n7Cw-4_HQ',
      playerVars: {
        'playsinline': 1
      },
      // events: {
      //   'onReady': onPlayerReady,
      //   'onStateChange': onPlayerStateChange
      // }
    });
  }
};

      // 4. The API will call this function when the video player is ready.
      // function onPlayerReady(event) {
      //   event.target.playVideo();
      // }


// search YouTube API for Videos by Channel Name and Embeddable videos only
var searchByChannelName = function() {

};

