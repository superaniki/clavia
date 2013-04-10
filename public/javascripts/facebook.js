



// Additional JS functions here
window.fbAsyncInit = function() {
  FB.init({
    appId      : '513435188694752', // App ID
    channelUrl : 'http://localhost:3004/channel.html', //'http://localhost:3004/channel.html', // Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });


  // Additional init code here
FB.getLoginStatus(function(response) {
  
    if (response.status === 'connected') {
        // connected
    } else if (response.status === 'not_authorized') {
        // not_authorized
        login();
    } else {
        // not_logged_in
        login();
    }

});


};



// Load the SDK Asynchronously
(function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "http://connect.facebook.net/sv_SE/all.js";
   ref.parentNode.insertBefore(js, ref);
 }(document));

function login() {
    FB.login(function(response) {
      
        if (response.authResponse) {
           testAPI();
            // connected
        } else {
            // cancelled
        }
        
    });

};

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
    });
}





/*

FB.init({
    appId      : '126534790858736', // App ID from the App Dashboard
    //channelUrl : 'http://arcane-hollows-1371.herokuapp.com/', // Channel File for x-domain communication
    status     : true, // check the login status upon init?
    cookie     : true, // set sessions cookies to allow your server to access the session?
    xfbml      : true  // parse XFBML tags on this page?
  });
*/

/*
http://connect.facebook.net/en_US/all/debug.js
window.fbAsyncInit = function() {
  // init the FB JS SDK
  console.log("facebook!");
  FB.init({
    appId      : '126534790858736', // App ID from the App Dashboard
    //channelUrl : 'http://arcane-hollows-1371.herokuapp.com/', // Channel File for x-domain communication
    //status     : true, // check the login status upon init?
    //cookie     : true, // set sessions cookies to allow your server to access the session?
    //xfbml      : true  // parse XFBML tags on this page?
  });

  // Additional initialization code such as adding Event Listeners goes here

};
*/
