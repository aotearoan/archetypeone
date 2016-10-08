import configuration from './config';
import gulp from 'gulp';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import eslint from 'gulp-eslint';
import size from 'gulp-size';
import babelify from 'babelify';
import browserify from 'browserify';
import runSequence from 'run-sequence';
import through2 from 'through2';
import errorNotify from './errorNotify';

gulp.task('lint', () => {
  gulp.src(configuration.paths.src.js.custom)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
});

gulp.task('vendor-js', () => {
  gulp.src(configuration.paths.src.js.vendor)
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(configuration.paths.dist + '/js/'))
    .pipe(size({title: 'vendor-js'}))
});

gulp.task('js', () => {

  // use `through2` to wrap around the regular ReadableStream returned by b.bundle();
  // so that we can use it down a vinyl pipeline as a vinyl file object.
  // `through2` takes care of creating both streaming and buffered vinyl file objects.
  let browserified = through2.obj(function (file, enc, next){
    browserify(file.path)
      .transform('babelify')
      .bundle(function(err, res){
        // assumes file.contents is a Buffer
        file.contents = res || null;
        next(null, file);
      }).on('error', errorNotify);
  });

  return gulp.src(configuration.paths.src.js.custom)
    .pipe(browserified)
    .pipe(concat('archetypeone.js'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(configuration.paths.dist + '/js/'))
    .pipe(size({title: 'js'}));
});

gulp.task('scripts', callback =>  { return runSequence(['vendor-js', 'lint', 'js'], callback) });
