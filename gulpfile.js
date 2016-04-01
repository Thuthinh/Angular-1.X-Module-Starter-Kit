/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    sort = require('gulp-sort'),
    del = require("del"),
    series = require('stream-series'),
    inject = require('gulp-inject'),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var paths = {
    bowerHome: './bower_components/',
    concatJsDest: "bundle.min.js",
    concatCssDest: "bundle.min.css"
};

var bowerJs = [
    'jquery/dist/jquery.js',
    'angular/angular.js',
    'angular-filter/dist/angular-filter.js',
    'kendo-ui-core/js/kendo.core.min.js',
    'kendo-ui-core/js/kendo.ui.core.min.js',
    'kendo-ui-core/js/kendo.angular.js',
    'ui-router/release/angular-ui-router.js',
    'moment/moment.js',
    'nprogress/nprogress.js',
    'toastr/toastr.js'
];

var bowerCss = [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap/dist/css/bootstrap-theme.min.css',
    'kendo-ui-core/styles/kendo.bootstrap.min.css',
    'kendo-ui-core/styles/kendo.common-bootstrap.min.css',
    'font-awesome/css/font-awesome.min.css',
    'nprogress/nprogress.css',
    'toastr/toastr.css'
];

var nonBowerCss = [
    './src/css/site.css'
];

function appendPath(array, path) {
    var result = [];
    array.forEach(function (item) {
        result.push(path + item);
    });
    return result;
}

gulp.task("clean", function (cb) {
    var folder = ['js/**/*', 'css/**/*', 'fonts/**/*'];
    return del(folder);
});

gulp.task("Copy-Files", ["clean"], function () {
    return gulp.src(paths.bowerHome + 'font-awesome/fonts/**/*.{ttf,woff,eot,svg,woff2}')
        .pipe(gulp.dest('./fonts'));
});

gulp.task("Application", ["Copy-Files"], function () {
    var css = gulp.src(appendPath(bowerCss, paths.bowerHome).concat(nonBowerCss))
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("./css"));

    var js = gulp.src(appendPath(bowerJs, paths.bowerHome));
    var app = gulp.src(['./src/js/**/*.js'])
        .pipe(sort({
            comparator: function (file1, file2) {
                if (file1.path.indexOf('module') > -1) {
                    return -1;
                }
                if (file2.path.indexOf('module') > -1) {
                    return 1;
                }
                return 0;
            }
        }));

    return series(js, app).pipe(concat(paths.concatJsDest)).pipe(uglify()).pipe(gulp.dest("./js"));
});

gulp.task("Production", ["Application"], function () {
    var target = gulp.src('index.html');
    var sources = gulp.src(['./js/**/*.js', './css/**/*.css'], { read: false });
    return target.pipe(inject(sources)).pipe(gulp.dest('.'));
});

gulp.task('Development', ["Copy-Files"], function () {
    var target = gulp.src('index.html');
    var css = gulp.src(appendPath(bowerCss, paths.bowerHome), { read: false });
    var js = gulp.src(appendPath(bowerJs, paths.bowerHome), { read: false });
    var otherCss = gulp.src(nonBowerCss, { read: false });
    var sources = gulp.src(['./src/js/app/**/*.js'], { read: false })
    .pipe(sort({
        comparator: function (file1, file2) {
            if (file1.path.indexOf('module') > -1) {
                return -1;
            }
            if (file2.path.indexOf('module') > -1) {
                return 1;
            }
            return 0;
        }
    }));

    return target.pipe(inject(series(css, js, otherCss, sources))).pipe(gulp.dest('.'));
});