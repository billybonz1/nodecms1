var gulp           = require('gulp'),
    gutil          = require('gulp-util' ),
    sass           = require('gulp-sass'),
    browserSync    = require('browser-sync'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    cleanCSS       = require('gulp-clean-css'),
    rename         = require('gulp-rename'),
    del            = require('del'),
    imagemin       = require('gulp-imagemin'),
    pngquant       = require('imagemin-pngquant'),
    cache          = require('gulp-cache'),
    autoprefixer   = require('gulp-autoprefixer'),
    fileinclude    = require('gulp-file-include'),
    gulpRemoveHtml = require('gulp-remove-html'),
    bourbon        = require('node-bourbon'),
    ftp            = require('vinyl-ftp'),
    html2jade = require('gulp-html2jade'),
    notify         = require("gulp-notify");


gulp.task('html2jade', function(){
    gulp.src('template/index.html')
        .pipe(html2jade({nspaces:2}))
        .pipe(rename(function (path) {
            path.basename = "test";
        }))
        .pipe(gulp.dest('app/views'));
});


gulp.task('browser-sync', function() {
    browserSync({
        proxy: 'http://localhost:3000/',
        notify: false
    });
});

gulp.task('sass', [], function() {
    return gulp.src('app/public/scss/**/*.scss')
        .pipe(sass({
            includePaths: bourbon.includePaths
        }).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS())
        .pipe(gulp.dest('app/public/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('headersass', function() {
    return gulp.src('template/header.sass')
        .pipe(sass({
            includePaths: bourbon.includePaths
        }).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS())
        .pipe(gulp.dest('template'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('libs', function() {
    return gulp.src([
        'app/public/libs/jquery/dist/jquery.min.js',
        'app/public/libs/bootstrap/js/dist/util.js',
        'app/public/libs/bootstrap/js/dist/modal.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/public/js'));
});

gulp.task('watch', ['sass', 'libs', 'browser-sync'], function() {
    gulp.watch('app/public/scss/**/*.scss', ['sass']);
    gulp.watch(['app/views/**/*.jade','app/**/*.js'], function(){
        setTimeout(browserSync.reload, 1000);
    });
});

gulp.task('imagemin', function() {
    return gulp.src('template/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('buildhtml', function() {
    gulp.src(['template/*.html'])
        .pipe(fileinclude({
            prefix: '@@'
        }))
        .pipe(gulpRemoveHtml())
        .pipe(gulp.dest('dist/'));
});

gulp.task('removedist', function() { return del.sync('dist'); });

gulp.task('build', ['removedist', 'buildhtml', 'imagemin', 'sass', 'libs'], function() {

    var buildCss = gulp.src([
        'template/css/fonts.min.css',
        'template/css/main.min.css'
    ]).pipe(gulp.dest('dist/css'));

    var buildFiles = gulp.src([
        'template/.htaccess'
    ]).pipe(gulp.dest('dist'));

    var buildFonts = gulp.src('template/fonts/**/*').pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('template/js/**/*').pipe(gulp.dest('dist/js'));

});

gulp.task('deploy', function() {

    var conn = ftp.create({
        host:      'hostname.com',
        user:      'username',
        password:  'userpassword',
        parallel:  10,
        log: gutil.log
    });

    var globs = [
        'dist/**',
        'dist/.htaccess',
    ];
    return gulp.src(globs, {buffer: false})
        .pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);