var gulp  = require('gulp');

gulp.task('default', function () {
  gulp.src('./config/default.yml')
    .pipe(gulp.dest('./public/config'));

  gulp.src('./spec/**/*_spec.js')
    .pipe(gulp.dest('./public/spec'));
});