module.exports = {
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
        vendor: [
          './bower_components/jquery/dist/jquery.min.js',
          './bower_components/fullpage.js/vendors/jquery.slimscroll.min.js',
          './bower_components/fullpage.js/jquery.fullPage.min.js',
          './bower_components/angular/angular.min.js',
          './bower_components/angular-ui-router/release/angular-ui-router.js',
          './bower_components/angular-fullpage.js/angular-fullpage.min.js'
        ],
        custom: ['./public/js/archetypeone.js']
      }
    },
    dist: './dist'
  }
};
