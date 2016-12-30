
var gulp = require("gulp");
var ts = require("gulp-typescript");
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var tsProject = ts.createProject("tsconfig.json");

gulp.task("uglify", function () {
    return tsProject.src()
        .pipe(tsProject()).js
        .pipe(babel())
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify({
			preserveComments: function (node, comment) {
				return /\/\//.test(comment.value);
			}
    	}))
        .pipe(rename({
			suffix: '.min'
		}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
})

gulp.task("build", function () {
    return tsProject.src()
        .pipe(tsProject()).js
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

