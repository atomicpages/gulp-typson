const gutils = require('gulp-util');
const typson = require('typson');
const PluginError = gutils.PluginError;
const through = require('through2');

const PLUGIN_NAME = 'gulp-typson';

/**
 * @param options {object} Options to pass to the plugin.
 */
module.exports = function (options) {
	'use strict';

	let opts = Object.assign({}, options);

	return through.obj(function generateJson(file, encoding, callback) {
		if (file.isNull()) {
			callback(null, file);
		}

		if (file.isStream()) {
			this.emit(new PluginError(PLUGIN_NAME, 'Plugin does not support streams.'));
		}

		typson.schema(file.path, "Demo").done(function (schema) {
			file.contents = new Buffer(JSON.stringify(schema.definitions, null, opts.pretty ? 4 : -1));
			file.path = file.base + file.path.split('/').pop().replace('.ts', '.json');
			callback(null, file);
		});
	});

};
