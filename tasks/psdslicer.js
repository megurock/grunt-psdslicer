/*
 * grunt-psdslicer
 * https://github.com/megurock/grunt-psdslicer
 *
 * Copyright (c) 2014 Eiji Meguro
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	var fs = require('fs'),
		path = require('path'),
		mustache = require('mustache'),
		Parser = require('psd').Parser;

	var getSlices = function(psdList) {
		if (!psdList) {
			return grunt.fatal("grunt.psdslicer requires a psd property.");
		}

		var _getSlices = function(psd, infoObj) {
			var data = fs.readFileSync(psd),
				parser = new Parser(data),
				resources = {},
				imageResources,
				slices,
				i,
				len;

			parser.parse();
			imageResources = parser.imageResources.imageResources;

			for (i = 0, len = imageResources.length; i < len; i++) {
				resources[imageResources[i].identifier] = imageResources[i];
			}

			//console.log(resources['1050'].toObject());
			slices = resources['1050'].toObject().slices;
			for (i = 0, len = slices.length; i < len; i++) {
				var slice = slices[i],
					info;

				if (slice.Nm) {
					info = {
						x: slice.bounds.Left,
						y: slice.bounds.Top,
						width: slice.bounds.Rght - slice.bounds.Left,
						height: slice.bounds.Btom - slice.bounds.Top
					};

					infoObj[slice.Nm] = info;
					//console.log("info", info);
				}
			}
		};


		// parse all psd files
		var sliceInfo = {};
		psdList = Array.isArray(psdList) ? psdList : [ psdList ];
		for (var i = 0, len = psdList.length; i < len; i++) {
			var psd = psdList[i],
				psdName = path.basename(psd).replace('.psd', ""),
				infoObj = {};

			sliceInfo[psdName] = infoObj;
			_getSlices(psdList[i], infoObj);	
		}
		return sliceInfo;
	};

	var createOutput = function(templateUrl, dest, slices) {
		if (!templateUrl || !dest) {
			return grunt.fatal("grunt.spritesheet requires a template and dest property.");
		}

		var template = fs.readFileSync(templateUrl, 'utf8'),
			sheetDir = path.dirname(dest),
			output = mustache.render(template, slices);

		grunt.file.mkdir(sheetDir);
		fs.writeFileSync(dest, output, 'utf8');
		grunt.log.writeln(dest, 'created.');
	};

	var step = function(config) {
		var slices = getSlices(config.psd);
		grunt.log.writeln('slices retrieved.\n', slices);
		createOutput(config.template, config.dest, slices);
	};	

	grunt.registerMultiTask('psdslicer', 'Execute psdslicer.', 
		function() {
			//console.log("files", this.files);
			console.log("this:", this);
			var config = this.data;
			//var config = grunt.config('psdslicer')[this.target];
			step(config);
		}
	);

};