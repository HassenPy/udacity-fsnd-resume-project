var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var minifyJS = require('gulp-minify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var mustache = require('gulp-mustache');
var rename = require('gulp-rename');


gulp.task('run', ['styles', 'compressJS', 'fonts', 'optimizepng', 'template', 'browser-sync'], function(){
    gulp.watch('src/css/*.css', ['styles']);
    gulp.watch('template.mustache', ['template']);
});

gulp.task('styles', function(){
    gulp.src('src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({
            compatibility: 'ie10',
            advanced: true
            })
        )
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

// Compress javascript with uglify js.
gulp.task('compressJS', function() {
  gulp.src('src/js/*.js')
    .pipe(minifyJS())
    .pipe(gulp.dest('dist/js'));
});

// Optimize all images.
gulp.task('optimizepng', function(){
  gulp.src('src/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});

// Just move the fonts to the dist dir.
gulp.task('fonts', function(){
  gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

  gulp.src('src/fontello/**/*')
    .pipe(gulp.dest('dist/fontello'));
});

// Compile the mustache template.
gulp.task('template', function(){
  gulp.src('template.mustache')
      .pipe(mustache('data.json',{},{}))
      .pipe(rename('index.html'))
      .pipe(gulp.dest('.'))
      .pipe(browserSync.stream());
});

gulp.task('browser-sync', function(){
    browserSync.init({
        server: "./",
    });
});
