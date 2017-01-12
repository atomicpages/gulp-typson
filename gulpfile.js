const gulp = require('gulp');
const concat = require('gulp-concat-json');
const typson = require('./index.js');

gulp.task('default', function () {
	return gulp.src('demo/*.ts')
		.pipe(typson({ pretty: true }))
		.pipe(concat('docs.json'))
		.pipe(gulp.dest('docs/'));
});
