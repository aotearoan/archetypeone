import configuration from './config';
import gulp from 'gulp';
import del from 'del';

gulp.task('clean', () => {
  del(configuration.paths.dist)
});
