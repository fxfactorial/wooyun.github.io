var fs = require("fs");
var path = require('path');
var async = require("async");
var cheerio = require("cheerio");
var imagesLink = [];

var parseData = function(data) {

	var $ = cheerio.load(data, {
		decodeEntities: false
	});
	var images = $("img");
	for (var i = 0; i < images.length; i++) {
		var imageSrc = $(images[i]).attr("src");
		imagesLink.push(imageSrc);
	}


	$("head").append('<link rel="stylesheet" type="text/css" href="../stylesheets/stylesheet.css" media="screen"><link rel="stylesheet" type="text/css" href="../stylesheets/github-dark.css" media="screen"><link rel="stylesheet" type="text/css" href="../stylesheets/print.css" media="print"><style type="text/css">body {width: 90%;max-width: 960px;display: block;margin: 0 auto;}img {max-width: 900px;}</style>');
	return $.html();

};

fs.readdir('./drops', (err, files) => {
	if (err) throw err;

	async.map(files, function(file, cb) {
		if (/\.html$/.test(file)) {
			fs.appendFile(path.join(__dirname, "link.html"), "<div class='link'><a href='drops/" + file + "'>" + file.replace("\.html", "") + "</a></div>\n", (err) => {
				if (err) throw err;
			});

			fs.readFile("./drops/" + file, "utf8", (err, data) => {
				if (err) throw err;

				data = parseData(data);

				fs.writeFile(path.join(__dirname, "/result/" + file), data, (err) => {
					if (err) throw err;
					console.log('[SAVED:]  ' + file);
					cb(null, file);
				});
			});
		}

	}, function(err, results) {

		// 		console.log(results);
		// for (var i = 0; i < imagesLink.length; i++) {
		// 	console.log("'"+imagesLink[i]+ "',");
		// }

	});
});