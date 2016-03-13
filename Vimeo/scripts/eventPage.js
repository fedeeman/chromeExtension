/*var links = '';
var temp = "temporary";
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    
    //chrome.browserAction.setBadgeText({tabId:sender.tab.id, "text" : "0"}); //VSEOBECNE NASAVENIE NA NULU
    
    if (request.message == "vimeoJSON") {
	    chrome.browserAction.setBadgeText({tabId:sender.tab.id, "text" : request.counter});//konkretna hodnota pre konkr. tab
      //chrome.pageAction.show(sender.tab.id);
       
      //links = request.url;
		}

    else if (request.message == "tedContent") {
      chrome.browserAction.setBadgeText({tabId:sender.tab.id, "text" : request.counter});//konkretna hodnota pre konkr. tab
      //chrome.pageAction.show(sender.tab.id);
      
      //links = request.url;
    }
    else if (request.message == "soundcloudContent") {
      chrome.browserAction.setBadgeText({tabId:sender.tab.id, "text" : request.counter});//konkretna hodnota pre konkr. tab
      //chrome.pageAction.show(sender.tab.id);
      
      //links = request.url;
    }

    if (request.message == "others"){
      //links = '';
    	chrome.browserAction.setBadgeText({tabId:sender.tab.id, "text" : request.counter});//konkretna hodnota pre konkr. tab
    }

    sendResponse({farewell: "goodbye"});
  });


*/
/*http://xfedor03@stud.fit.vutbr.cz:audeliver@audeliver.com/api/user
var temp = "not logged";
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://audeliver.com/api/user", true, "xfedor03@stud.fit.vutbr.cz", "audeliver");
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    if (xhr.status == 200) 
    {
      // WARNING! Might be evaluating an evil script!
      
      alert(xhr.responseText);
    }
  }
}
xhr.send();

}*/
/*var username = "xfedor03@stud.fit.vutbr.cz";
var password = "audeliver";
$.ajax
  ({
    type: "GET",
    beforeSend: function (xhr) {
    xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
},
    url: "http://audeliver.com/api/user",
    dataType: 'json',
    async: true,
    data: '{"username": "' + username + '", "password" : "' + password + '"}',
    success: function (){
    alert('Thanks for your comment!'); 
    }

});*/
/*var xhr = new XMLHttpRequest();
xhr.open("GET", "http://audeliver.com/api/recordings", true);
xhr.setRequestHeader("Authorization", 'Basic ' + 'eGZlZG9yMDNAc3R1ZC5maXQudnV0YnIuY3o6YXVkZWxpdmVy');
xhr.onload = function () {
    console.log(xhr.responseText);
};
xhr.send(null);*/

var loggedIn = false;
//var wrongLogin = false;
console.log("BP: Script started...");

//function for logging in
var logIn = function (callback) {
  callback();
  /*if (loggedIn == true)
  {
    chrome.browserAction.setPopup({popup: "frontpage.html"}); 
  }*/
  return true;
}

//function for loggin out
var logOut = function() {
  chrome.browserAction.setPopup({popup: "popup.html"}); 
  return true;
}


//listener for messages from different scripts
chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
        if ($.isArray(msg))
        {
          if (msg[0][0] == "namepass") {
            console.log("name: " + msg[1][1]);
            console.log("pass: " + msg[2][1]); 
            //je uspesne lognuty
            if (logIn(function(){

              $.ajax({
                type: "GET",
                contentType: "xml",
                url: "http://audeliver.com/api/user",
                beforeSend: function (xhr) {
                  xhr.setRequestHeader("Accept", "application/xml");
                  xhr.setRequestHeader("Authorization", "Basic "+ btoa(msg[1][1] + ":" + msg[2][1]));
                  //xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                },   

                complete: function(xhr, data) {
                        if (xhr.status != 0)
                        {
                          //alert('success');
                          if (xhr.responseXML.getElementsByTagName("status").length){
                            var status = xhr.responseXML.getElementsByTagName("status")[0].innerHTML;                          
                            if (status == "401")
                            {
                              console.log(xhr.responseText);
                              port.postMessage("login401 ");
                              wrongLogin = true;
                              loggedIn = false;
                            }
                          }
                          else 
                          {
                            loggedIn = true;
                            port.postMessage("loginRefresh");                        
                          }
                        }
                        else
                        {
                          alert('fail');
                        }
                    }
                });
            })) {
              
            }
            else {
              loggedIn = false;
            }
            //port.postMessage("loginSuccess");
          }
        }
        else if (msg == "logOut") {
          if (logOut()) {
            loggedIn = false;
            port.postMessage("logOut");
          }
        }
  });
});