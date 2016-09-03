var fs = require("fs");
var path = require('path');
var request = require('request');
var index = 1;

var downloadImage = function(src, dest, callback) {
	request.head(src, function(err, res, body) {
		// console.log('content-type:', res.headers['content-type']);
		// console.log('content-length:', res.headers['content-length']);
		if (src) {
			request(src).pipe(fs.createWriteStream(dest)).on('close', function() {
				callback(null, index++);
			});
		}

	});

};

var downloadImage2 = function(src, dest, callback) {
	var iArr = src.split("/");
	var imageName = iArr[iArr.length - 1];
	//console.log("Download begin: " + imageSrc);

	var download = function(uri, filename, callback) {
		request.head(uri, function(err, res, body) {
			// console.log('content-type:', res.headers['content-type']);
			// console.log('content-length:', res.headers['content-length']);
			if (uri) {
				request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
			}

		});
	};

	download(src, "./images/" + imageName, cb);

};

downloadImage("http://static.wooyun.org/20140918/2014091811544377515.png", "./1.png", function(err, data){
	console.log(arguments);
	if (err) {
		console.log(err)
	}
	if (data) {
		console.log("data: " + data);
	}
})