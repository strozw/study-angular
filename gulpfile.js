
var gulp = require('gulp');
var gulpWebpack = require('gulp-webpack');
var browserSync = require('browser-sync');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');


var APP_ENV = 'production';

var config = {
  webpack: {
    entry: {
      bundle: __dirname + '/src/index.js',
    },
    output: {
      path: __dirname + '/dist/',
      filename: '[name].js',
    },
    //devtool: '#inline-source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }
      ]
    },
    plugins: [
      new ngAnnotatePlugin({
        add: true
      })
    ],
    resolve: {
      extensions: ['', '.js']
    }
  }
};

gulp.task('js', function() {
  var webpackConfig = config.webpack;

  if (APP_ENV == 'dev') {
    webpackConfig.devtool = '#inline-source-map';
  }

  return gulp.src('src/**/*.js')
    .pipe(gulpWebpack(webpackConfig))
    .pipe(gulp.dest('dist/'));
});

gulp.task('is-dev', function() {
  APP_ENV = 'dev';
});

gulp.task('build', ['devConfig', 'js']);

gulp.task('watch', ['is-dev', 'js'], function() {
  return gulp.watch('./src/**/*.js', ['js']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    open: false,
     server: {
       baseDir: "./"
     }
   });
});
