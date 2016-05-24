var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('sass', function () {
    return gulp.src('scss-samples/*.scss')
        .pipe($.sass({
            outputStyle: 'expanded'
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(function (f) {
            return f.base;
        }));
});

gulp.task('default', ['sass']);
