# SpotiTube
Spotify + YouTube - Play your favorite Spotify Playlists, but with YouTube videos.

**Version 1.0.0**

## The Purpose
The purpose of our project was to create an application that used a spotify api to generate a list of tracks from a "This is (Artist Name)" playlist then take the selected tracks that populate, and through a series of youtube related api's find the equivalent official music video on youtube (if it exists) and push it to a personal youtube account music video playlist. We were inspired with the idea for this project because we all felt music videos provide a more enriching listening experience and it gives you a chance to get more intimate with the artists' expression. We reasoned it was an awesome way to get more exposure to new artists/music to better determine if one would like to commit to said artist long term.

### Significant Changes
This project required us to utilize many different aspects of what we learned so far in the last six weeks. We incorporated frameworks like Jquery and Basscss to assist in writing dynamic script, and css styling respectively. We received API data from Spotify and Youtube to interpret the incoming data to retrieve pertinent information such as: Oauth 2.0 authentication, spotify playlists, user youtube playlist Id, and Music Video Id's. 

#### Challenges
There were significant challenges on this project that had a lot to do with traversing the unknown. Our group decided to use API's none of us had experience with so it required significant time spent with the API documentations. Another pitfall was Google would have limitations to queries per day for a given account which we would hit rather quickly because interactions with music videos had a high "unit" count. We had three different API keys for youtube and two different client ID's and it still would be something we would have to be mindful about. Lastly, the dreaded error 500 kept coming up which is an internal server error that we do not have much control over, so when we attempt to push the music videos to the user's youtube playlist not all songs would get ported over unfortunately. 

##### Things To Consider
When testing clear your broswer data- cookies, search history, cache etc. as we have come to find that does cause some interference in the error 500 we keep seeing on youtube's end. Secondly, log in intially before testing to authorize your consent to have your youtube account modified. Lastly, make sure you have an existing youtube channel and verify that you have a playlist already created with the applicable playlist Id as one of our API's will be looking for that to exist. 

##### Website Screenshot
<img width="1255" alt="spotitube-tutorial-modal" src="https://user-images.githubusercontent.com/17223625/143802986-9d9e7198-a9a1-4e92-8913-3bb7420d0b90.png">

###### Deployed Link/ License and Copyright
https://feortegas.github.io/SpotiTube/

© Xander Rapstine, Trilogy Education Services/2U