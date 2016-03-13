//chrome.runtime.sendMessage({message: "others"});

/*
var vids = document.getElementsByTagName('video');
// vids is an HTMLCollection
for( var i = 0; i < vids.length; i++ ){ 
    console.log(vids.item(i));
} */

var vids = document.getElementsByTagName('video');
for (var i = 0; i < vids.length; i++) {
	//source in src attribute
	var status = vids[i].getAttribute("src");
	if (status) {
		console.log(vids[i].src);
	}
	//source as child of node
	//TO DO: iterating through <source> tags

}
if (vids.length > 0) {
	chrome.runtime.sendMessage({message: "others", counter: vids.length.toString()});
}
console.log(vids.length);


//console log linky na videa


