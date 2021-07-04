// プラグインの読み込み
var gulp = require("gulp");
var gulpSass = require("gulp-sass");
var gulpPostcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var browserSync = require('browser-sync').create();
var gulpPlumber = require('gulp-plumber');
var gulpNotify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');

// ソースディレクトリ
var source = 'src/';

// Bootstrap sass ディレクトリ
var bootstrapSass = {
    in: './node_modules/bootstrap/scss'
};

// sass、css関連の変数を設定
var sass = {
    in: 'scss/**/*scss',
    out: source + 'css/',
    watch: 'scss/**/*',
    sassOpts: {
        // 圧縮方法（expanded、nested（ネストがインデントされる）、compact（規則集合毎が1行になる）、compressed（全CSSコードが1行になる））
        outputStyle: 'compressed',
        // @import機能で利用できるパスを指定
        includePaths: [bootstrapSass.in]
    }
};

// sassをコンパイルするタスク
gulp.task('sass', function () {
    // コンパイル対象のsassディレクトリを指定
    return gulp
        .src(sass.in)
        // ソースマップ作成
        .pipe(sourcemaps.init())
        // コンパイルエラー時、エラーメッセージをデスクトップ通知
        .pipe(gulpPlumber({
            errorHandler: gulpNotify.onError("Error: <%= error.message %>")
        }))
        // コンパイル実行（sass->css）
        .pipe(gulpSass(sass.sassOpts))
        // ベンダープレフェックス付与
        .pipe(gulpPostcss([autoprefixer()]))
        // ソースマップ書き込み
        .pipe(sourcemaps.write('./'))
        // cssをcssディレクトリに出力
        .pipe(gulp.dest(sass.out))
        .pipe(browserSync.stream())
        // コンパイル成功時、正常メッセージをデスクトップ通知
        .pipe(gulpNotify({
            message: 'Finished sass',
            sound: false,
        }));
});

// browser-syncの初期設定
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            // browser-syncのコンテキストルートを指定
            baseDir: 'src/'
        },
        // 最初に開くページを指定
        startPath: 'index.html'
    });

    // sass,JS,ディレクトリを監視し、更新があれば自動コンパイルしてブラウザに反映
    gulp.watch(sass.watch, gulp.series('sass'));
    // htmlディレクトリ、jsディレクトリを監視し、更新があればブラウザをリロード
    gulp.watch(['src/' + '*html', source + 'css/*']).on('change', browserSync.reload);

});

// 各タスクを直列で実行
gulp.task('default', gulp.series('sass', 'browser-sync'));
