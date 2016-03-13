
$(function () {

//here we get code of script where are links to video in JSON format
var li = $("#shoji > div.shoji__door > div > div.main.talks-main > script:nth-child(5)").text();
//TO DO: too absolute!!! find <script> tag (where is JSON with whole data)

li = li.substring(18, li.length-1); //cutting off unnecessary parts
li = JSON.parse(li); // parsing to JSON format

/**********************
	-Update badge
	-Get them to popup.html
**********************/
var link = []; //assosiative array for all available qualities (audio, low, medium, high)
var count = 0;
if (li.talks[0].audioDownload) {
	//audio link is available (no need to get video)
	link["audio"] = li.talks[0].audioDownload;
	console.log(link["audio"]);
	count += 1;
}
else {
	//only video si available
	var linkArr = li.talks[0].nativeDownloads; //JSON object with all qualities (low, medium, high by default)
	for (x in linkArr) {
		link[x] = li.talks[0].nativeDownloads[x];
		console.log(link[x]);
		count += 1;
	}
}
chrome.runtime.sendMessage({message: "tedContent", url: link, counter: count.toString()});
});


	

