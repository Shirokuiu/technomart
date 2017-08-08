var gulp = require('gulp'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    spritesmith = require('gulp.spritesmith'),
    del = require('del');

gulp.task('less', function() {
  gulp.src('app/less/style.less')
  .pipe(plumber())
  .pipe(less())
  .pipe(postcss([
    autoprefixer({browsers: [
      'last 1 version',
      'last 2 Chrome versions',
      'last 2 Firefox versions',
      'last 2 Opera versions',
      'last 2 Edge versions'
    ]}),
    mqpacker({
      sort: true
    })
  ]))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src('app/js/*.js'),
        uglify(),
        rename({suffix: '.min'}),
        gulp.dest('dist/js')
    ],
    cb
  );
});

gulp.task('cssmin', function() {
  gulp.src('app/css/style.css')
  .pipe(cssnano())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('images', function() {
  return gulp.src('app/img/*.+(jpg|png)')
  .pipe(imagemin({
    interlaced: true,
    progressive: true,
    une: [pngquant()]
  }))
  .pipe(gulp.dest('dist/img'));
})

gulp.task('clean', function() {
  del.sync('dist');
});

gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('app/img/sprite/*.*') 
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.less',
                cssFormat: 'css',
                imgPath: '../img/sprite.png',
                padding: 30,
                algorithm: 'top-down',
                cssVarMap: function(sprite) {
                    sprite.name = '' + sprite.name
                }
            }));
    spriteData.img.pipe(gulp.dest('app/img/')); 
    spriteData.css.pipe(gulp.dest('app/less/')); 
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('watch', ['browser-sync', 'less'], function() {
  gulp.watch('app/less/**/*.less', ['less']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch('app/img/sprite/*.*', ['sprite']);
});

gulp.task('build', ['clean', 'compress', 'cssmin', 'images'], function() {
  var buildFonts = gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'));
  var buildHtml = gulp.src('app/*.html')
  .pipe(gulp.dest('dist'));
});

