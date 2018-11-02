var gulp = require('gulp');
var server = require('gulp-webserver');
var path = require('path');
var sass = require('gulp-sass');
var url = require('url');
var data = require('./src/data/data');
gulp.task('webserver', function() {
    return gulp.src('./src')
        .pipe(server({
            porp: 8080,
            open: true,
            livereload: true, //监听变化自动刷新
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return;
                }
                if (pathname === '/api/index') {
                    res.end(JSON.stringify(data));
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(require('fs').readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});
gulp.task('sass', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
});
gulp.task('watch', function() {
    return gulp.watch('./src/sass/*.scss', gulp.series('sass'));
});
gulp.task('dev', gulp.series('webserver', 'sass', 'watch'));