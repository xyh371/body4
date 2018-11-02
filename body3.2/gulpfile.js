var gulp = require('gulp');
var server = require('gulp-webserver');
var path = require('path');
var sass = require('gulp-sass');
var url = require('url');
var List = [{
    user: 'lili',
    pwd: '123'
}];
gulp.task('webserver', function() {
    return gulp.src('./src')
        .pipe(server({
            porp: 8081,
            open: true,
            livereload: true, //监听变化自动刷新
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return;
                }
                if (pathname === '/api/index') {
                    var key = url.parse(req.url, true).query.key;
                    console.log(key);
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
// var str = '';
// req.on('data', function(chunk) {
//     str += chunk;
// });
// req.on('end', function() {
//     var qurey = require('querystring').parse(str);
//     var isHas = List.some(function(item) {
//         return item.user === qurey.user && item.pwd === qurey.pwd
//     });
//     if (isHas) {
//         res.end(JSON.stringify({ code: 1, msg: "登录成功" }))
//     } else {
//         res.end(JSON.stringify({ code: 1, msg: "用户名或密码错误" }))
//     }
// })