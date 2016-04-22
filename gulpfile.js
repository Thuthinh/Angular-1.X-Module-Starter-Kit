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
    moduleHome: './node_modules/',
    concatJsDest: "bundle.min.js",
    concatCssDest: "bundle.min.css"
};

var vendorJs = [
    'jquery/dist/jquery.js',
    'angular/angular.js',
    'angular-ui-router/release/angular-ui-router.js',
    'moment/moment.js',
    'nprogress/nprogress.js',
    'toastr/build/toastr.min.js'
];

var vendorCss = [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap/dist/css/bootstrap-theme.min.css',
    'font-awesome/css/font-awesome.min.css',
    'nprogress/nprogress.css',
    'toastr/build/toastr.min.css'
];

var nonVendorCss = [
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
    return gulp.src(paths.moduleHome + 'font-awesome/fonts/**/*.{ttf,woff,eot,svg,woff2}')
        .pipe(gulp.dest('./fonts'));
});

gulp.task("Application", ["Copy-Files"], function () {
    var css = gulp.src(appendPath(vendorCss, paths.moduleHome).concat(nonVendorCss))
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("./css"));

    var js = gulp.src(appendPath(vendorJs, paths.moduleHome));
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
    return target.pipe(inject(sources,{relative: true})).pipe(gulp.dest('.'));
});

gulp.task('Development', ["Copy-Files"], function () {
    var target = gulp.src('index.html');
    var css = gulp.src(appendPath(vendorCss, paths.moduleHome), { read: false });
    var js = gulp.src(appendPath(vendorJs, paths.moduleHome), { read: false });
    var otherCss = gulp.src(nonVendorCss, { read: false });
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
