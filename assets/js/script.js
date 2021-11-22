//Nahom's API key = 'AIzaSyAwl6OYOGUNSDQLOOk2O7KKDPHJuEI2M-I';
var searchInput = document.querySelector('#artistId')
//https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&onBehalfOfContentOwnerChannel=UCkDDetCtGc5_qOu9kNjVShw&key=AIzaSyA2gSQ1nqtkt0AqrTla0h3si_c5SmquD6Q  Playlist API
//`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel}&maxResults=5&order=date&key=AIzaSyAwl6OYOGUNSDQLOOk2O7KKDPHJuEI2M-I`


// Get Artist *working*
var getData = function(artist, song) {
    // Format the github API url
    var apiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${artist}${song}&maxResults=1&order=viewCount&type=video&key=AIzaSyA2gSQ1nqtkt0AqrTla0h3si_c5SmquD6Q`;
    ;
    console.log(apiUrl);
    // Make a request to the url
    fetch(apiUrl)
    .then(function (response) {
      //Request was successful
      if (response.ok) {
        response.json().then(function (data) {
         console.log(data);
        for (i=0; i < data.items.length; i++) {
            console.log(`#video` + `${i}`);
            $(`#video-${i}`).append(`<h6>${data.items[i].snippet.title}</h6>`);
            $(`#video-${i}`).append(`<a href=` + "https://www.youtube.com/watch?v=" + `${data.items[i].id.videoId} target="_blank"> <img src=${data.items[i].snippet.thumbnails.default.url}></a>`);
        }
        });
      } else {
        alert("Error: GitHub User Not Found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to GitHub");
    });
    }
    






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
    }


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
    })
}

