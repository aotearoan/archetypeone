// Add our dependencies
import gulp from 'gulp';
import concat from 'gulp-concat';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import del from 'del';
import uglify from 'gulp-uglify';
import eslint from 'gulp-eslint';
import size from 'gulp-size';
import babelify from 'babelify';
import browserify from 'browserify';
import runSequence from 'run-sequence';
import through2 from 'through2';
import errorNotify from './errorNotify';

// Configuration
const configuration = {
  paths: {
    src: {
      fonts: [
        './bower_components/font-awesome/fonts/*.*'
      ],
      html: './public/*.html',
      server: './server.js',
      images: './public/images/*.*',
      sass: {
        vendor: './public/css/vendor.scss',
        custom: './public/css/archetypeone.scss'
      },
      js: {
        vendor: [],
        custom: ['./public/js/archetypeone.js']
      }
    },
    dist: './dist'
  }
};

gulp.task('lint', () => {
  gulp.src(configuration.paths.src.js.custom)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
});

gulp.task('html', () => {
  gulp.src(configuration.paths.src.html)
    .pipe(gulp.dest(configuration.paths.dist));
});

gulp.task('server', () => {
  gulp.src(configuration.paths.src.server)
    .pipe(gulp.dest(configuration.paths.dist));
});

gulp.task('images', () => {
  gulp.src(configuration.paths.src.images)
    .pipe(gulp.dest(configuration.paths.dist + '/images/'));
});

gulp.task('fonts', () => {
  gulp.src(configuration.paths.src.fonts)
    .pipe(gulp.dest(configuration.paths.dist + '/fonts/'));
});

gulp.task('vendor-css', () => {
  gulp.src(configuration.paths.src.sass.vendor)
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(configuration.paths.dist + '/css/'))
});

gulp.task('css', () => {
  gulp.src(configuration.paths.src.sass.custom)
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(configuration.paths.dist + '/css/'))
});

gulp.task('vendor-js', () => {
  gulp.src(configuration.paths.src.js.vendor)
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(configuration.paths.dist + '/js/'))
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

  return gulp.src(jsModuleFiles)
    .pipe(config.filterNonCodeFiles())
    .pipe(reload({stream: true, once: true}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(browserified)
    .pipe(ngAnnotate())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${config.dist_dir}/javascripts/src`))
    .pipe(size({title: 'scripts'}));


  gulp.src(configuration.paths.src.js.custom)
    .pipe(concat('archetypeone.js'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(configuration.paths.dist + '/js/'))
});

gulp.task('clean', () => {
  del(configuration.paths.dist)
});

gulp.task('default', ['html', 'images', 'server', 'fonts', 'css', 'vendor-css', 'vendor-js', 'lint', 'js']);
