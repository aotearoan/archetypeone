var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    minifyhtml = require('gulp-minify-html'),
    minifyimages = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    serve = require('gulp-serve');

gulp.task('default', 'pkg');

gulp.task('pkg', 'clean', ['sass','js', 'html', 'images']);

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('sass', function() {
    return gulp.src('public/css/*.scss')
        .pipe(sass({ style: 'compressed' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/public/css'))
});

gulp.task('js', function() {
    return gulp.src('public/js/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/public/js'));
});

gulp.task('html', function() {
    return gulp.src('public/*.html')
        .pipe(minifyhtml())
        .pipe(gulp.dest('dist/public'));
});

gulp.task('images', function() {
    return gulp.src('public/images/*')
        .pipe(minifyimages())
        .pipe(gulp.dest('dist/public/images'));
});

gulp.task('serve', serve('public'));
gulp.task('serve-build', serve(['public', 'build']));
gulp.task('serve-prod', serve({
    root: ['public', 'dist'],
    port: 3001}
));