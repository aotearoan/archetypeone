import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('default', callback =>  { return runSequence(['bower'], ['static', 'styles', 'scripts'], callback) });
