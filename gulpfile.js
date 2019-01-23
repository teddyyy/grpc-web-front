const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const minimist = require('minimist');

var args = minimist(process.argv.slice(2));

gulp.task('default', function() {
});

// clean the contents of the distribution directory
gulp.task('clean', function () {
    return del('build/**/*');
});

// set env
gulp.task('setup', function() {
    var env = args.env;
    return gulp.src('src/resources/' + env + '/env.ts').pipe(gulp.dest('src/resources'))
});

// build package in ./dist for dev
gulp.task('build', function() {
    return runSequence('clean', 'setup');
});
