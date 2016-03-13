//http://stackoverflow.com/questions/5016442/chrome-extension-refresh-popup-html-to-a-new-html-page


$(document).ready(function() {
  var port = chrome.extension.connect({name: "Popup - background Communication"});
  var loggedIn = chrome.extension.getBackgroundPage().loggedIn;
  //var wrongLogin = chrome.extension.getBackgroundPage().wrongLogin;

  if (loggedIn) {
    console.log("I'm logged in");
    
  }
  else
  {
    console.log("I'm not logged In");    
  }

  //listener for messages from eventPage
  port.onMessage.addListener(function(msg) {
        if (msg == "loginRefresh")
        {            
          //http://stackoverflow.com/questions/5016442/chrome-extension-refresh-popup-html-to-a-new-html-page
          window.location.href = "frontpage.html";//temp change 
          chrome.browserAction.setPopup({popup: "frontpage.html"}); 
        }
        else if (msg == "login401")
        {          
          console.log("login 401"); 
          $('#error').text("401: Unauthorized");
        }
        else if (msg == "logOut")
        {            
          window.location.href = "popup.html";//temp change 
        }
  });

  //callback for clicking button "log in"
  $('#btnLogIn').click(function(){
  
    var username = $('#myName').val();
    var password = $('#myPass').val();
    //http://stackoverflow.com/questions/13546778/how-to-communicate-between-popup-js-and-background-js-in-chrome-extension
    port.postMessage([["namepass"],["name", username],["pass", password]]);
    return false;
  });

  //callback for clicking button "log out"
  $('#btnLogOut').click(function(){
    port.postMessage("logOut");
    return false;
  });

 

});