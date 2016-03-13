//LOGIN: xfedor03@stud.fit.vutbr.cz
//PASS: bachelor2015	
//CLIENT ID: 315f339aace67ecc31cbc0d82acc73e5
//https://api.soundcloud.com/resolve.json?url=https://soundcloud.com/octobersveryown/drake-back-to-back-freestyle&client_id=315f339aace67ecc31cbc0d82acc73e5

var client_id = "315f339aace67ecc31cbc0d82acc73e5";
var url = document.URL;
var fullApiJSON = "https://api.soundcloud.com/resolve.json?url="+url+"&client_id="+client_id;
var cnt = 0;
var xhr = new XMLHttpRequest();
xhr.open("GET", fullApiJSON, true);
xhr.onreadystatechange = function() {
	if (xhr.readyState == 4) {
		var jsonResponse = JSON.parse(xhr.responseText); 
		if (jsonResponse.downloadable) {
		// if it's official download available
			streamUrl = jsonResponse.download_url+"?client_id="+client_id;
			cnt += 1;
		}
		else if (jsonResponse.stream_url) {
			streamUrl = jsonResponse.stream_url+"?client_id="+client_id;
			cnt += 1;
		}
		console.log(streamUrl);
		chrome.runtime.sendMessage({message: "soundcloudContent", url: streamUrl, counter: cnt.toString()});

	}
}
xhr.send();		
//DOROBIT DOM CHANGE	
