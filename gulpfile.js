var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

var lessSrc = './src/less/**/*.less';
var coffeeSrc = './src/coffeescript/**/*.coffee';

gulp.task('less', function () {
  return gulp.src(lessSrc)
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('minify-css', ['less'], function () {
  return gulp.src('./public/stylesheets/**/*.css')
    .pipe(minifyCss())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./public/dist/css'));
});

gulp.task('coffee', function () {
  gulp.src(coffeeSrc)
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./public/javascripts'));
});

gulp.task('clean-scripts', function () {
  return gulp.src('./public/dist/js/*.js', {read: false})
    .pipe(clean({
      force: true
    }));
});

gulp.task('uglify', ['coffee', 'clean-scripts'], function () {
  gulp.src('./public/javascripts/**/*.js')
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('./public/dist/js'));
});

gulp.task('default', ['minify-css', 'uglify']);

gulp.watch(lessSrc, ['minify-css']);
gulp.watch(coffeeSrc, ['uglify']);