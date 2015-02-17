// Include Gulp
var gulp = require('gulp');

// All of your plugins
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var minify = require('gulp-minify-css');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

// Compile CSS, Autoprefix
gulp.task('styles', function() {
  return gulp.src('assets/css/scss/style.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('./build/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minify())
    .pipe(gulp.dest('./build/css'))
    .pipe(notify({ message: "Alfred: I've organized your files for you." }));
});

// Lint, Concatenate and Minify JavaScript
gulp.task('scripts', function() {
  return gulp.src(['assets/js/jquery.min.js', 'assets/js/scripts.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./build/scripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts'))
    .pipe(notify({ message: "Alfred: I've organized your files for you." }));
});

// Watch files for changes
gulp.task('watch', function() {
    gulp.watch('assets/js/*.js', ['scripts']);
    gulp.watch('assets/css/**/*.scss', ['styles']);
});

// Default Task
gulp.task('default', function() {
    gulp.start('styles', 'scripts', 'watch');
});