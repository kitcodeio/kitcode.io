var gulp = require('gulp');
var git = require('gulp-git');

gulp.task('updateSubmodules', function(){
  git.updateSubmodule({ args: '--init' });
});



