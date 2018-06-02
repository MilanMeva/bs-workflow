var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();

var raw = {
    sass:"./raw/sass/*.scss",
    bs:"./node_modules/bootstrap/scss/bootstrap.scss",
    bsjs : "./node_modules/bootstrap/dist/js/bootstrap.min.js",
    jquery : "./node_modules/jquery/dist/jquery.min.js",
    popper : "./node_modules/popper.js/dist/popper.min.js",
    faFont: "./node_modules/font-awesome/fonts/*",
    fa:"./node_modules/font-awesome/css/font-awesome.min.css",
    html:"./raw/*.html"
}

var dest = {
    css:"./src/css",
    js:"./src/js",
    img:"./src/img",
    font:"./src/fonts"
}

gulp.task('sass',function(){
    return gulp.src([raw.bs,raw.sass])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dest.css)).pipe(browserSync.stream());
});

gulp.task('javascript',function(){
    return gulp.src([raw.bsjs,raw.jquery,raw.popper])
          .pipe(gulp.dest(dest.js));
});

gulp.task("fonts",function(){
    return gulp.src(raw.faFont).pipe(gulp.dest(dest.font))
})


gulp.task("fa",function(){
    return gulp.src(raw.fa).pipe(gulp.dest(dest.css))
})

gulp.task("html",function(){
    gulp.src(raw.html).pipe(gulp.dest("./src")).pipe(browserSync.stream());
})

gulp.task("serve",["sass","html"],function(){
    browserSync.init({
        server:"./src"
    });

    gulp.watch(raw.sass,["sass"]);
    gulp.watch("./raw/*.*",["html"]).on("change",browserSync.reload);
})

gulp.task("default",['serve','javascript','fonts','fa'],function(){
    console.log("started....");
})

