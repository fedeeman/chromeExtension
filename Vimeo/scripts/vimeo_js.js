//test links: 
// https://vimeo.com/28388228 old vimeo
// https://vimeo.com/channels/staffpicks/151047286 novy staff picks
// https://vimeo.com/channels/staffpicks/85959378 stary staff picks
// https://vimeo.com/150865551 new vimeo

//function for getting VIDEO ID
var getID = function () {
	var str = document.URL;
	var n = str.lastIndexOf('/');
	var result = str.substring(n + 1);	
	//DOWNLOAD GETVIDEOINFO
	var url = "https://player.vimeo.com/video/"+ result +"/config";
	//console.log(url);
	getJSON(url);
};
//function for recieving JSON and sending it to background page
var getJSON = function(url) {

	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
		   	
		   	var jsonResponse = JSON.parse(xhr.responseText); //text -> JSON
		   	//console.log(jsonResponse);
		   	var qualityUrls = []; // links to a video in different qualities (by default SD, HD, mobile)
		   	var urlCounter = 0; //number of streams found (used in the badge)
		   	//looping over qualities and getting urls
		   	for(var key in jsonResponse.request.files.progressive) {
		   		console.log(jsonResponse.request.files.progressive[key].quality + "..." +jsonResponse.request.files.progressive[key].url);
		   		qualityUrls[jsonResponse.request.files.progressive[key].quality] = jsonResponse.request.files.progressive[key].url;		   		
		   		urlCounter += 1;
		   	}

			   	test = urlCounter.toString();
			   	//var vimeoLinks = (qualityUrls["mobile"] + "\n" + qualityUrls["sd"]+"\n"+qualityUrls["hd"]);
				chrome.runtime.sendMessage({message: "vimeoJSON", counter: test});
				//chrome.runtime.sendMessage({message: "vimeoJSON", url: vimeoLinks, counter: test});

			    /**************************************************************

			   		-At this time I've got all vimeo links in "qualityUrls" and
			   		counter of them in "UrlCounter"
			   		-We need to get counter to the badge (different badge for every tab)
			   		-Links to popup.html (need different popup.html for every tab)
			   		
			   	**************************************************************/

			  }
			}
	xhr.send();
};

//Observing a DOM change
var observ = function() {
	var target = $("#video")[0];
	var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {    
	    if (mutation.attributeName == "data-player")
	    {
	    	getID();
	    }
	  });    
		
	});
	var config = { attributes: true,
	    childList: true,
	    characterData: true,
	    subtree:true };
	observer.observe(target, config);
};

//START OF MAIN FUNCTION
getID();
observ();



		
  	
/*
chrome.runtime.sendMessage({message: "vimeoJSON", url: result}, function(response) {
  console.log(response.farewell);
}); */


//DOWNLOAD VIDEO ID JSON FILE and GET LINK
//https://player.vimeo.com/video/116754785/config