var fs = require("fs");
var path = require('path');
var request = require('request');
var imageLinks = require("../image_links").imageLinks;

var Bagpipe = require('bagpipe');
var bagpipe = new Bagpipe(10);
var index = 1;

var downloadImage = function(src, dest, callback) {
	request.head(src, function(err, res, body) {
		// console.log('content-type:', res.headers['content-type']);
		// console.log('content-length:', res.headers['content-length']);
		if (src) {
			request(src).pipe(fs.createWriteStream(dest)).on('close', function() {
				callback(null, dest);
			});
		}

	});

};

for (var i = 0; i < imageLinks.length; i++) {
	if (imageLinks[i].indexOf("http://static.wooyun.org") === 0) {
		var destImage = path.resolve("./images/", imageLinks[i].split("/")[imageLinks[i].split("/").length -1]);
		bagpipe.push(downloadImage, imageLinks[i], destImage, function(err, data) {
			console.log("["+ index++ +"]: " + data);
		});
	}
}