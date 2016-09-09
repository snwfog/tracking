var gulp  = require('gulp');

gulp.task('default', function () {
  gulp.src('./config/default.yml')
    .pipe(gulp.dest('./public/config'));

  gulp.src('./test/**/*_test.js')
    .pipe(gulp.dest('./public/test'));
});