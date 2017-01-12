gulp-typson
===========

A simple and minimal wrapper around [typson](https://github.com/lbovet/typson) schema for gulp.

**Note:** This plugin generates one JSON file per typescript file read unless specified otherwise.

## Usage
~~~bash
npm install gulp-typson --save-dev
~~~

In your `gulpfile.js`

~~~js
const gulp = require('gulp');
const typson = require('gulp-typson');

gulp.task('typson', function () {
	return gulp.src('demo/*.ts')
		.pipe(typson({ pretty: true }))
		.pipe(gulp.dest('docs/'));
});
~~~

Want to merge all JSON files into one?

~~~js
const gulp = require('gulp');
const concat = require('gulp-concat-json');
const typson = require('gulp-typson');

gulp.task('default', function () {
	return gulp.src('demo/*.ts')
		.pipe(typson({ pretty: true }))
		.pipe(concat('docs.json'))
		.pipe(gulp.dest('docs/'));
});
~~~

## Options
* `pretty: boolean` set `true` to pretty print the JSON source.

### Changelog

#### 1.0.0
* Initial release
