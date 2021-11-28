// ***
// YouTube Authentication API script file
// ***

var GoogleAuth;
      var SCOPE = 'https://www.googleapis.com/auth/youtube.force-ssl';
      var CLIENT_ID = '471819150021-lt79m6gbg9kdd9s9gk73tbboq7atp4cg.apps.googleusercontent.com';
      var apiKey = 'AIzaSyAwl6OYOGUNSDQLOOk2O7KKDPHJuEI2M-I';
      function handleClientLoad() {
        // Load the API's client and auth2 modules.
        // Call the initClient function after the modules load.
        gapi.load('client:auth2', initClient);
      }
    
      function initClient() {
        // In practice, your app can retrieve one or more discovery documents.
        var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';
    
        // Initialize the gapi.client object, which app uses to make API requests.
        // Get API key and client ID from API Console.
        // 'scope' field specifies space-delimited list of access scopes.
        gapi.client.init({
            'apiKey': apiKey,
            'clientId': CLIENT_ID,
            'discoveryDocs': [discoveryUrl],
            'scope': SCOPE
        }).then(function () {
          GoogleAuth = gapi.auth2.getAuthInstance();
    
          // Listen for sign-in state changes.
          GoogleAuth.isSignedIn.listen(updateSigninStatus);
    
          // Handle initial sign-in state. (Determine if user is already signed in.)
          var user = GoogleAuth.currentUser.get();
          setSigninStatus();
    
          // Call handleAuthClick function when user clicks on
          //      "Sign In/Authorize" button.
          $('#sign-in-or-out-button').click(function() {
            handleAuthClick();
          });
        });
      }
    
      function handleAuthClick() {
        if (GoogleAuth.isSignedIn.get()) {
          // User is authorized and has clicked "Sign out" button.
          GoogleAuth.signOut();
        } else {
          // User is not signed in. Start Google auth flow.
          GoogleAuth.signIn();
        }
      }
    
      function setSigninStatus() {
        var user = GoogleAuth.currentUser.get();
        var isAuthorized = user.hasGrantedScopes(SCOPE);
        if (isAuthorized) {
          $('#sign-in-or-out-button').html('Sign out');
          $('#auth-status').html('You are currently signed in and have granted ' +
              'access to this app.');
              playList();
        } else {
          $('#sign-in-or-out-button').html('Sign In/Authorize');
          $('#auth-status').html('You have not authorized this app or you are ' +
              'signed out.');
        }
      }
    
      function updateSigninStatus() {
        setSigninStatus();
      }