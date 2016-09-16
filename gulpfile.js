var gulp = require('gulp');
var util = require('gulp-quintype')
var del = require('del');

var destination = "public/progressive/assets";

function compileAll() {
  return util.manifestAndWrite(destination, util.merge(
    util.sass("./resources/assets/sass/application.scss"),
    util.browserify("./resources/assets/js/application.js", "application.js"),
    util.files("./resources/assets/images/**/*")
  ));
};

gulp.task("server-compile", function() {
  return util.browserify("./resources/assets/js/server.js", "server.js")
    .pipe(gulp.dest("resources"));
});

gulp.task("clean", function() { return del([destination]); });
gulp.task("compile", compileAll);
gulp.task("clean-compile", ["clean"], compileAll);
gulp.task("default", ["server-compile", "clean-compile"]);

gulp.task('watch', ['clean-compile'], function() {
  gulp.watch("./resources/assets/**/*", ['server-compile', 'compile']);
});
