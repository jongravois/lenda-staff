var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
///////////
gulp.task('clean-styles', function(done) {
    clean(config.css + 'styles.css');
});
gulp.task('default', ['newjs']);
gulp.task('help', $.taskListing);
gulp.task('newjs', function() {
    var target = gulp.src('./index.html');
    var sources = gulp.src([
        './app/**/*.js',
        './_modules/**/*.js'
    ], {read: false});
    return target.pipe($.inject(sources))
        .pipe(gulp.dest('./'));
});
gulp.task('styles', function() {
    log('Compiling Less --> CSS');

    return gulp
        .src(config.less)
        .pipe($.less())
        .on('error', errorLogger)
        .pipe(gulp.dest(config.css));
});
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

///////////
function clean(path, done) {
    log('Cleaning ' + $.util.colors.blue(path));
    del(path, done);
}
function errorLogger(error) {
    log('*** Error Start ***');
    log(error);
    log('*** Error End ***');
    this.emit('end');
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
