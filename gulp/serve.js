import configuration from './config';
import gulp from 'gulp';

gulp.task('serve', () => {
  gulp.src(configuration.paths.src.server)
    .pipe(gulp.dest(configuration.paths.dist));
});
