var fs = require("fs");
var path = require('path');
var async = require("async");
var request = require('request');
var imageLinks = require("../image_links").imageLinks;

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

async.mapSeries(imageLinks, function(item, callback) {
	//console.log(item);
	setTimeout(function() {
		if (item.indexOf("http://static.wooyun.org") === 0) {
			var destImage = path.resolve("./images/", item.split("/")[item.split("/").length -1]);
			downloadImage(item, destImage, function(err, data){
				console.log("["+ index++ +"]: " + data);
			});
			
		}
		callback(null, item);
	}, 100);


}, function(err, results) {});