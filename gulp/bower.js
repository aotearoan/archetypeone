import gulp from 'gulp';
import bower from 'gulp-bower';

gulp.task('bower', () => {
  return bower({cmd: 'install' });
});