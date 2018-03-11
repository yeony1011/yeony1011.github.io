var gulp = require('gulp');
var src = "src";
var dist ="dist";
var port = 5000;
var path = {
    img: {
        src:src+'/image/**/*.*',
        dist:dist+'/image/',
        exc:'!./src/image/sprite/*.*'
    },
    js: {
        src:src+'/js/main.js',
        dist:dist+'/js/'
    },
    scss: {
        src:src+'/scss/**/*.scss',
        dist:dist+'/css/',
        autoprefixer:dist+'/css/style.min.css'
    },
    sprite: {
        src:src+'/image/sprite/*.*',
        dist:dist+'/image/',
        css:src+"/scss/common/"
    },
    html: {
        src:src+"/html/**/*.html",
        dist:dist+"/html/",
        exc:"!./dist/html/include/**/*.html"
    }
}

//브라우저 싱크
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
    gulp.task('bs', function(){
    browserSync.init({
        //proxy: "localhost"
        server: {
            baseDir: dist,
            index: "./html/main/index.html"
        },
        port:port,
            ui: {
                port: port+1
        }
    });
    gulp.watch(path.scss.src, ["sass"]);
    gulp.watch(path.js.src, ["js-min"]);
    gulp.watch(path.sprite.src+"**/*.*", ["sprite"]);
    gulp.watch(path.img.src+'**/*.*,' ["image-min"]);
    gulp.watch(path.html.src, ["html-include"]);
});

//이미지 스프라이트
var spritesmith = require('gulp.spritesmith');
    gulp.task('sprite',function(){
        var spriteData = gulp.src(path.sprite.src)
            .pipe(spritesmith({
                imgName:'sprite.png',
                cssName:'_sprite.scss',
                padding:10,
		            cssTemplate: 'sprite.css.handlebars'
		}));
    spriteData.img.pipe(gulp.dest(path.sprite.dist));
  	spriteData.css.pipe(gulp.dest(path.sprite.css));
});

//이미지 압축
var imagemin = require('gulp-imagemin');
gulp.task('image-min', function() {
    gulp.src(path.img.src)
        .pipe(imagemin())
        .pipe(gulp.dest(path.img.dist))
        .pipe(browserSync.stream({match: '**/*.*'}))
});

//스크립트 압축
var minify = require('gulp-minify');
gulp.task('js-min', function() {
    gulp.src(path.js.src)
        .pipe(minify({
            ext:{
                min:'.min.js'
            },
                ignoreFiles: ['.min.js']
            }))
        .pipe(gulp.dest(path.js.dist))
        .pipe(browserSync.stream({match: '**/*.js'}))
});

//벤더프리픽스 설정
var autoprefixer = require('gulp-autoprefixer');

//소스맵 (css minify)
var sourcemaps = require('gulp-sourcemaps');

//gulp-scss
var sass = require('gulp-sass');
gulp.task('sass', function() {
    return gulp.src(path.scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
                'ie >= 8',
                'last 10 Chrome versions',
                'last 10 Firefox versions',
                'last 2 Opera versions',
                'iOS >= 7',
                'Android >= 4.1'
            ],
            cascade: true,
            remove: false
        }))
        .pipe(sourcemaps.write('./', {
            includeContent: true,
            sourceRoot: './sass'
        }))
        .pipe(gulp.dest(path.scss.dist))
        .pipe(browserSync.stream({match: '**/*.css'}))
        .on("finish",reload)
});

//w3c
var w3cjs = require('gulp-w3cjs');
gulp.task('w3cjs', function () {
    gulp.src([path.html.dist+"**/*.html",path.html.exc])
        .pipe(w3cjs())
        .pipe(w3cjs.reporter());
});

//html include
var include = require('gulp-html-tag-include');
gulp.task('html-include', function() {
    return gulp.src(path.html.src)
        .pipe(include())
        .pipe(gulp.dest(path.html.dist))
        .pipe(browserSync.stream({match: "**/*.html"}))
});

//watch html
// gulp.task('watch-html', function () {
//     gulp.watch(path.html.src, ['html-include']);
// });