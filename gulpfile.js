/*==================================================
=            npm install gulp --sav-dev            =
==================================================*/
// to disable>dest path replace fs
/*----------  dependance  > package.json > node_modules  ----------*/
var gulp     = require('gulp'),
browserSync  = require('browser-sync'),
slim         = require("gulp-slim"),
sass         = require('gulp-sass'),
plumber      = require('gulp-plumber'),
premailer    = require('gulp-premailer'),
autoprefixer = require('gulp-autoprefixer'),
rename       = require('gulp-rename'),
using        = require('gulp-using'),
rm           = require('gulp-rimraf'),
rimraf       = require('rimraf'),
prettify     = require('gulp-html-prettify'),
changed      = require('gulp-changed'),
debug        = require('gulp-debug');
// imgmin    = require('gulp-imagemin'),

// src & output
var  src = 'src/';
/*=================================
=            task init            =
=================================*/
// browser-sync task !attention il faut un index.html obligatoire
gulp.task('browserSync',function () {
  browserSync({
    server: {
      baseDir: 'render/FR'
    }
  })
})


// cp img folder
gulp.task('img', function() {
  return gulp.src([src+'**/images/*.{png,jpg,gif}'])
  // .pipe(npm()) // img optimize
  .pipe(changed('src/**/images/'))
  .pipe(gulp.dest('render'))
  .pipe(using())
  .on('end',function () {
    // start slim to render
    gulp.start('slim');
  })
  .pipe(browserSync.reload({stream: true }));
})

// sass task
gulp.task('sass', function() {
  return gulp.src(src+'**/scss/*.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(sass({errLogToConsole: true}))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(rename(function(path) {
    path.dirname += "/../css";
  }))
  .pipe(gulp.dest('render'))
  .pipe(using())
  .pipe(browserSync.reload({stream: true }));
})

// slim task
gulp.task('slim', function () {
  var slimEnd = false;
  return gulp.src([src+'**/slim/*.slim'])
  .pipe(using())
  .pipe(slim( {pretty: true, indent: '2' })) // cb // {read:false},
  .pipe(rename(function(path) {
    path.dirname += "/../";
  }))
  .pipe(gulp.dest('render')) // html folder after rename ^
  .pipe(plumber())
  .pipe(browserSync.reload({
    stream: true
  }))
  .on('end',function () {
    slimEnd = true;
    premailergo(slimEnd);
  })
});
// premailer task // si erreur sass > rendu incomplet à gérer
gulp.task('premailer', function () {
  gulp.src('render/**/*.html')
  .pipe(plumber())
  .pipe(premailer()) //,{read:false}
  .pipe(prettify({indent_car:'', indent_size: 2}))
  .pipe(gulp.dest('render'))
  .on('end',function () {
    premailEnd = true;
    console.log('premailerOK: '+premailEnd+' rm render/slim folder ');
    rimraf('./render/**/css',function (err) {console.log("css destroy");});
    rimraf('./render/**/slim',function (err) {console.log("slim destroy");});
  })
  .pipe(debug({title: 'endPremailer:'}))
});
// 
// premailer
function premailergo (slimEnd) {
  console.log('slim complete: '+slimEnd);
  if(slimEnd=true){
    gulp.start(['premailer'])
    .on('end', function (argument) {
      console.log('yeah is done')
    })
  }else{
    console.log('slim pas prêt.......')
  }
};

// lancement > fonction watch
gulp.task('dev',['browserSync','img','slim','sass','premailer'], function() {
  // src+'*.slim', ,src+'**/*.slim' // pas de fichier sur :root
  gulp.watch([src+'**/images/*.{png,jpg,gif}'],['img','slim','sass']);
  gulp.watch([src+'**/slim/*.slim',src+'**/**/*.slim'],['slim','sass','premailer']);
  gulp.watch(src+'**/scss/*.scss',['sass','premailer','slim']);
});
