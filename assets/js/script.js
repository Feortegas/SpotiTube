//var channelId = 'UC0WP5P-ufpRfjbNrmOWwLBQ';
var searchInput = document.querySelector('#channelId')
//l
//`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel}&maxResults=5&order=date&key=AIzaSyAwl6OYOGUNSDQLOOk2O7KKDPHJuEI2M-I`


// Get Artist 
var getData = function(artist) {
    // Format the github API url
    var apiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${artist}&maxResults=1&order=viewCount&type=video&key=AIzaSyAwl6OYOGUNSDQLOOk2O7KKDPHJuEI2M-I`;
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
            $(`#video-${i}`).append(`<h6>${data.items[i].snippet.title}</h6>`);
            $(`#video-${i}`).append(`<a href=` + "https://www.youtube.com/watch?v=" + `${data.items[i].id.videoId} target="_blank"> <img src=${data.items[i].snippet.thumbnails.default.url}></a>`);
            //$(`#video-${i}`).append(`<a href=` + "https://www.youtube.com/watch?v=" + `${data.items[i].id.videoId} target="_blank"> Link! </a>`);
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
    

var userInput = function() {
    $(".btn-info").on('click', function(event){
        event.preventDefault();
        if (searchInput) {
        var artist = $('#channelId').val();
        getData(artist)
        searchInput.value = '';
        }
        else {
            alert('Please enter a seach input')
        }
    })
}


userInput();