import configuration from './config';
import gulp from 'gulp';
import size from 'gulp-size';
import runSequence from 'run-sequence';

gulp.task('html', () => {
  gulp.src(configuration.paths.src.html)
    .pipe(gulp.dest(configuration.paths.dist))
    .pipe(size({title: 'html'}))
});

gulp.task('images', () => {
  gulp.src(configuration.paths.src.images)
    .pipe(gulp.dest(configuration.paths.dist + '/images/'))
    .pipe(size({title: 'images'}))
});

gulp.task('fonts', () => {
  gulp.src(configuration.paths.src.fonts)
    .pipe(gulp.dest(configuration.paths.dist + '/fonts/'))
    .pipe(size({title: 'fonts'}))

});

gulp.task('static', callback =>  { return runSequence(['html', 'images', 'fonts'], callback) });
