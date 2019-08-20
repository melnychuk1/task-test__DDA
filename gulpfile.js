const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rimraf= require('rimraf');
const rename= require('gulp-rename');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');


/*----- Server --------*/
gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 4000,
            baseDir: "build"
        }
    });

    gulp.watch('build/**/*').on('change', browserSync.reload)
});


/*----- Style ------*/
gulp.task('styles:compile', function () {
    return gulp.src('source/style/main.scss')
        .pipe(plumber())
        .pipe(sass().on('error', notify.onError(function(err) {
            return {
                title: 'Styles',
                message: err.message
            };
        })))
        .pipe(rename('main.min.css'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('build/style'))
        });

/*------ HTML -------*/
gulp.task('copy:html', () => {
    return gulp.src('source/*.html')
        .pipe(gulp.dest('build'));
});

/*------ Copy js -------*/
gulp.task('copy:js', () => {
    return gulp.src('source/*.js')
        .pipe(gulp.dest('build'));
});

/*------ Copy img ------*/
gulp.task('copy:images', function () {
    return gulp.src('source/images/**/*.*')
        .pipe(gulp.dest('build/images'));
});

/*------ Copy slid ------*/
gulp.task('copy:slid', function () {
    return gulp.src('slick/**/*.*')
        .pipe(gulp.dest('build/slick'));
});

/*------ Delete -------*/
gulp.task('clean', function del(cb){
    return rimraf('build', cb);
});

/*_____________Watchers___________*/
gulp.task('watch', function () {
    gulp.watch('source/**/*.html', gulp.series('copy:html'));
    gulp.watch('source/*.js', gulp.series('copy:js'));
    gulp.watch('source/style/**/*.scss', gulp.series('styles:compile'));
});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('copy:html', 'styles:compile', 'copy:images', 'copy:slid', 'copy:js'),
    gulp.parallel('watch', 'server')
));


