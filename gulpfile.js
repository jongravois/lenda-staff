var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
///////////
gulp.task('default', ['newjs']);
gulp.task('help', $.taskListing);
gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS');

    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});
gulp.task('newjs', function() {
    var target = gulp.src('./index.html');
    var sources = gulp.src([
        './app/**/*.js',
        './_modules/**/*.js'
    ], {read: false});
    return target.pipe($.inject(sources))
        .pipe(gulp.dest('./'));
});

///////////
function clean(path, done) {
    log('Cleaning ' + $.util.colors.blue(path));
    del(path, done);
}
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
