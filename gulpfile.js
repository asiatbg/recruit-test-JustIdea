const gulp = require('gulp');
const sass = require('gulp-sass');
const sasslint = require('gulp-sass-lint');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const babel = require('gulp-babel');


// Browser sync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            watch: true,
            baseDir: 'dist'

        },
    })
});

gulp.task('sass-lint', function() {
    return gulp.src(['app/scss/**/*.scss', '!app/scss/base/reset.scss'])
        .pipe(sasslint())
        .pipe(sasslint())
        .pipe(sasslint.format())
        .pipe(sasslint.failOnError())
});





// Compile and concat SASS file
gulp.task('sass', function() {
    return gulp.src('app/scss/all.scss')
        .pipe(sass())
        .pipe(concat('styles.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
                stream: true
            }
        ))
});

// Concat js file
gulp.task('js', function() {
    return gulp.src('app/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('index.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
                stream: true
            }
        ))
});

// Copy html file into dist
gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
                stream: true
            }
        ))
});

// Copy fonts and images
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*.ttf')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe(gulp.dest('dist/images'))
});

//watch tasks
gulp.task('watch', function(){
    gulp.watch(['app/js/**/*.js', 'app/*.html', 'app/fonts/**/*', 'app/images/**/*', 'app/scss/**/*.scss'], gulp.series(['js', 'html', 'fonts', 'images', 'sass', "sass-lint"]));
});

gulp.task('default', gulp.series(['js', 'html', 'sass', 'sass-lint', 'fonts', 'images', gulp.parallel(['watch', 'browserSync'])]));

