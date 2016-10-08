import configuration from './config';
import gulp from 'gulp';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import size from 'gulp-size';

gulp.task('vendor-css', () => {
  gulp.src(configuration.paths.src.sass.vendor)
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(configuration.paths.dist + '/css/'))
    .pipe(size({title: 'vendor-css'}))
});

gulp.task('css', () => {
  gulp.src(configuration.paths.src.sass.custom)
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(configuration.paths.dist + '/css/'))
    .pipe(size({title: 'css'}))
});

gulp.task('styles', ['vendor-css', 'css']);
