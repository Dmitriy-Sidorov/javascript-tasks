var gulp = require('gulp');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var browserSync = require("browser-sync");
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var minimist = require('minimist');
var prettier = require('gulp-prettier');
var gulpif = require('gulp-if');
var prefixer = require('postcss-prefixer');
var imagemin = require('gulp-imagemin');
var rename = require("gulp-rename");
var bulkSass = require('gulp-sass-bulk-import');
var concatMap = require('./static_src/scripts/concat-map.js');
var reload = browserSync.reload;

var argv = minimist(process.argv.slice(2), {
    env: 'development'
});

if (argv.env === 'development') {
    var env = argv.env;
} else {
    var env = 'production';
}

var buildPath = "static";
var devPath = "static_src";

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: buildPath + '/',
        php: buildPath + '/',
        js: buildPath + '/js/',
        css: buildPath + '/css',
        img: buildPath + '/img/',
        fonts: buildPath + '/fonts/',

        prefix: devPath + '/styles/utilities/bootstrap-utilities/',
    },
    src: { //Пути откуда брать исходники
        html: devPath + '/*.html',
        php: devPath + '/**/*.php',
        js: devPath + '/scripts/**/*.js',
        prefix: devPath + '/styles/utilities/bootstrap-utilities/utilities.*.scss',
        style: devPath + '/styles/main.scss',
        img: devPath + '/images/**/*',
        fonts: devPath + '/fonts/**/*.*',
        lib: devPath + '/lib/',

        slickFonts: 'node_modules/slick-carousel/slick/fonts/*.*',
        slickImg: 'node_modules/slick-carousel/slick/*.gif'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: devPath + '/**/*.html',
        php: devPath + '/**/*.php',
        js: devPath + '/scripts/**/*.js',
        style: devPath + '/styles/**/*.scss',
        img: devPath + '/images/**/*.*',
        fonts: devPath + '/fonts/**/*.*'
    },
};

var config = {
    server: {
        baseDir: buildPath
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    open: false,
    browser: 'chrome',
    logPrefix: "GulpServer"
};

gulp.task('html:build', function () {
    return gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('php:build', function () {
    return gulp.src(path.src.php) //Выберем файлы по нужному пути
        .pipe(plumber())
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({ stream: true })); //И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', function () {
    return gulp.src(concatMap)
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(gulpif(env !== 'development', uglify(), sourcemaps.write()))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('prefix', function () {
    var plugins = [
        prefixer({
            prefix: 'u-',
            ignore: []
        })
    ];
    return gulp.src(path.src.prefix)
        .pipe(sass().on('error', sass.logError))
        .pipe(rename("bootstrap-utilities.scss"))
        .pipe(postcss(plugins))
        .pipe(gulp.dest(path.build.prefix));
});

gulp.task('style:build', function () {
    return gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(bulkSass())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer({
            browsers: ['last 10 versions', 'ie 10', 'ie 11']
        })]))
        .pipe(gulpif(env !== 'development', cssnano(), sourcemaps.write()))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    return gulp.src([path.src.img, path.src.slickImg])
        .pipe(plumber())
        .pipe(gulpif(env !== 'development', imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ])))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
    return gulp.src([path.src.fonts, path.src.slickFonts])
        .pipe(plumber())
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('build', gulp.series( gulp.parallel(
    'html:build',
    'php:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
)));

gulp.task('watch', function () {
    gulp.watch(path.watch.html,     gulp.series('html:build'));
    gulp.watch(path.watch.php,      gulp.series('php:build'));
    gulp.watch(path.watch.style,    gulp.series('style:build'));
    gulp.watch(path.watch.js,       gulp.series('js:build'));
    gulp.watch(path.watch.img,      gulp.series('image:build'));
    gulp.watch(path.watch.fonts,    gulp.series('fonts:build'));
});

gulp.task('dev', gulp.series('prefix', 'build', 'webserver', 'watch'));
gulp.task('watch', gulp.series('build', 'watch'));
gulp.task('default', gulp.series('build'));
