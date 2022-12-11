//gulp
const gulp = require("gulp");

//sassコンパイルパッケージ
const sass = require("gulp-sass")(require("sass"));
const postcss =require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter =require("css-declaration-sorter");
const mmq = require("gulp-merge-media-queries");
const cleanCss=require("gulp-clean-css");

//js縮小のパッケージ
const uglify =require("gulp-uglify");
const rename =require("gulp-rename");

//ブラウザ
const browserSync =require("browser-sync");

//html整形
const htmlBeautify =require("gulp-html-beautify");

//タスク終了防止と通知
const plumber =require("gulp-plumber");
const notify =require("gulp-notify");


//sassコンパイルの関数
function compileSass(){
    return gulp.src("./src/assets/sass/**/*.scss")
    .pipe(sass()) //sassファイルのコンパイル
    .pipe(postcss([autoprefixer(),cssSorter()])) //autoprefixer→ベンダープリフィックス　cssSorter→cssを順番に揃えて出力
    .pipe(mmq()) //メディアクエリをまとめて出力する
    .pipe(gulp.dest("./public/assets/css/")) //publicフォルダにcssファイルの出力
    .pipe(cleanCss()) //cssファイルの圧縮
    .pipe(rename({  //リネーム
        suffix:".min"
    }))
    .pipe(gulp.dest("./public/assets/css/"))
}

//jsの圧縮の関数
function minJS(){
    return gulp.src("./src/assets/js/**/*.js")
    .pipe(gulp.dest("./public/assets/js/"))  //そのままのファイルを出力
    .pipe(uglify())  //jsファイルの圧縮
    .pipe(rename({  //リネーム
        suffix:".min"
    }))
    .pipe(gulp.dest("./public/assets/js/"))
}

//html整形の関数
function formatHtml(){
    return gulp.src("./src/**/*.html")
    .pipe(htmlBeautify({
        indent_size:2,
        indent_with_tabs:true,
    }))
    .pipe(gulp.dest("./public/"))
}

//画像ファイルのただの移動 
function copyImage(){
    return gulp.src("./src/assets/img/**/*")
    .pipe(gulp.dest("./public/assets/img/"))
}

//ブラウザを立ち上げるための処理関数
function browserInit(done){
    browserSync.init({
        server:{
            baseDir:"./public/"  //ローカルサーバーが立ち上がったときに基準とするフォルダパス（ここではコンパイル後のpublicフォルダを指定）
        },
    });
    done();
}

//ブラウザをリロードするための処理関数
function browserReload(done){
    browserSync.reload();
    done();
}

//ファイル監視の関数→変更のあったsass,jsファイルを自動でコンパイル,圧縮,jsの圧縮したら、その後ブラウザをリロードする処理を行う。
function watch(){
    gulp.watch('./src/assets/sass/**/*.scss', gulp.series(compileSass,browserReload));
    gulp.watch('./src/assets/js/**/*.js', gulp.series(minJS,browserReload));
    gulp.watch('./src/**/*.html', gulp.series(formatHtml,browserReload));
    gulp.watch('./src/img/**/*', gulp.series(copyImage,browserReload));
}


//コマンド登録　exports.コマンド名 = 関数名;

//ファイル出力テストコマンド npx gulp build
exports.build = gulp.parallel(formatHtml,minJS,compileSass,copyImage);

//ブラウザの立ち上げとファイルのコンパイルを自動で行えるように並行処理コマンドを登録する npx gulp dev
exports.dev = gulp.parallel(browserInit,watch);





//コマンドライン上でタスク実行 npx gulp コマンド名
//追加でパッケージインストールするときは npm install --save-dev パッケージ名
//このタスクを他フォルダで環境を作りたいときは、package.jsonとgulpfile.jsをコピーして、ターミナルでnpm installするとすべてのパッケージがインストールできる。