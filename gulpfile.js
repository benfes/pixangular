var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    notify = require('gulp-notify');

gulp.task('default', ['clean'], function(){
    gulp.start('styles','scripts');
});

gulp.task('clean', function(cb){
  del(['dist/assets/css','dist/assets/js','dist/assets/img','dist/vendor'],cb);
});

gulp.task('styles', function(){
    return sass('src/sass/*.scss',{ style: 'expanded' })
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(notify({message: 'Styles task complete'}));
});

gulp.task('scripts', function(){
  return gulp.src('src/js/**/*.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
  .pipe(concat('ngSavings.js'))
  .pipe(gulp.dest('dist/assets/js'))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('dist/assets/js'))
  .pipe(notify({message: 'Scripts task complete'}));
});

gulp.task('watch', function(){
  gulp.watch('src/js/**/*.js',['scripts']);
  livereload.listen();
  gulp.watch(['dist/**']).on('change', livereload.changed);
});
