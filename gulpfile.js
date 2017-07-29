var gulp = require('gulp');
var	concat =  require('gulp-concat');
var	uglify = require('gulp-uglify');
var	sass = require('gulp-sass');
var	minifyCSS = require('gulp-minify-css');
var	webserver = require('gulp-webserver');
var watch = require('gulp-watch');
var imagenes = require('gulp-imagemin')

gulp.task('script', function(){
	gulp.src(['node_modules/jquery/dist/jquery.js', 'assets/js/*.js'])
		.pipe(concat('script.js'))
		// carpeta dist
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('style', function(){
	gulp.src(['assets/sass/main.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(minifyCSS())
		.pipe(concat('style.min.css'))
		.pipe(gulp.dest('dist/css/'));
});

gulp.task('webserver', function(){
	gulp.src('../pinterest/')
		.pipe(webserver({
		fallback: 'index.html',
		livereload: true,
		directoryListing: false,
		open: true
		}));
});

// no funciona las imagenes -.-
gulp.task('imagenes', function() {
  return gulp.src('img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('img'));
});

gulp.task('watch', function() {
    gulp.watch('assets/sass/*.scss', ['style']);
    // Vigila las imagenes en
  	gulp.watch('img/**/*', ['imagenes']);
});


gulp.task('default', ['script', 'style', 'webserver', 'imagenes', 'watch']);