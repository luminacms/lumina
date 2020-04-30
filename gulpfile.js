var gulp = require('gulp');
var gulpif = require('gulp-if');
var del = require('del');
var fs = require("fs")
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
const zip = require('gulp-zip');
const unzip = require('gulp-unzip');
const moment = require('moment');
var minifyCSS = require('gulp-cssnano');
var postcss = require('gulp-postcss'); // CSS 预处理
var postcssAutoprefixer = require('autoprefixer');
var util = require('gulp-util');

var back_up_number = 3;
var paths = {
    src: {
        dir: './resources/lumina',
        backup: __dirname + '/storage/backup/static'
    },
    dist: {
        dir: './public/lumina'
    }
}

var js_min_options = {
    mangle: true, //输出变量名替换后的文件
    compress: {
        sequences: true, //使用逗号操作符加入连续的简单语句
        properties: true, //使用点好重写属性访问，例如foo["bar"] → foo.bar
        dead_code: true, //移除不可达的代码
        drop_debugger: true, //移除调试器和调试语句
        conditionals: true, //为if -else 和条件表达式应用优化
        evaluate: true, //尝试去计算常量表达式
        booleans: true, //多种针对布尔上下文的优化，例如 !!a ? b : c → a ? b : c
        loops: true, //当我们可以静态的判断条件的取值时，针对do,while和for循环的优化
        unused: true, //去掉没有被引用过的函数和变量
        hoist_funs: true, // 提升函数声明
        hoist_vars: false, //(默认值: false) — 提升var声明 (因为一般看起会增加输出的大小，所以它默认是false的)
        if_return: true, //这对 if/return 和 if/continue 的优化
        join_vars: true, //加入连续的var语句
        // cascade      : true, //对于 sequences, transform x, x into xandx = something(), x into x = something() 的一些小优化
        drop_console: true, //默认为false.  传入true会丢弃对console.函数的调用.
        comparisons: true, //针对二进制节点应用某些特定的优化，例如:!(a <= b) → a > b (只在不安全时), 尝试去否认二进制节点，例如.a = !b && !c && !d && !e → a=!(b||c||d||e) 等等.
        unsafe: false //应用“不安全”的转换
    }
}
//自动补全
function compileAutoprefixer() {
    return gulp.src(paths.src.dir + '/**/*.css')
        .pipe(postcss([
            postcssAutoprefixer({
                browsers: ['last 5 versions']
            })
        ]))
        .pipe(gulp.dest(paths.dist.dir));
}

//CSS 压缩
function miniCSS() {
    return gulp.src(paths.src.dir + '/**/*.css')
        .pipe(minifyCSS({
            safe: true,
            reduceTransforms: false,
            advanced: false,
            compatibility: 'ie7',
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest(paths.dist.dir));
}

function miniJs() {
    return gulp.src([paths.src.dir + '/**/*.js'])
        .pipe(gulpif('!**/*.min.js', babel({
            presets: ['@babel/env']
        })))
        .pipe(gulpif('!**/*.min.js', uglify(js_min_options)))
        .pipe(gulp.dest(paths.dist.dir));
}
function devMiniJs() {
    return gulp.src([paths.src.dir + '/**/*.js'])
        .pipe(gulp.dest(paths.dist.dir));
}

function delDist() {
    return del([paths.dist.dir]);
}

function delDev() {
    return del([paths.src.dir])
}


// 复制资源
function copyResource() {
    return gulp.src(paths.src.dir + '/**/*.{JPG,jpg,png,gif,svg,eot,ttf,woff}')
        .pipe(gulp.dest(paths.dist.dir));
}

function backupStatic() {
    var timestamp = moment(new Date()).format('YYYYMMDDHHmmss')
    return gulp.src(paths.src.dir + '/**/*')
        .pipe(zip('static_' + timestamp + '.zip'))
        .pipe(gulp.dest(paths.src.backup))
        .on('end', function () {
            // delDev();
            removeOldBackup();
        })
}

function removeOldBackup() {
    var file = fs.readdirSync(paths.src.backup);
    var backupArr = []
    file.forEach(function (ele, index) {
        var _file_path = paths.src.backup + "\\" + ele
        var info = fs.statSync(_file_path);
        backupArr.push({
            'path': _file_path,
            'created_at': info.ctime
        })
    })

    if (backupArr.length > back_up_number) {
        backupArr = backupArr.sort(function (a, b) {
            return b.created_at - a.created_at;
        })
        for (var i = back_up_number; i < backupArr.length; i++) {
            del(backupArr[i].path)
        }
    }
}



function delStatic() {
    del([paths.src.dir])
    return del([paths.dist.dir])
}

function unzipBackup() {
    var file = fs.readdirSync(paths.src.backup);
    var backupArr = []
    file.forEach(function (ele, index) {
        var _file_path = paths.src.backup + "/" + ele
        var info = fs.statSync(_file_path);
        backupArr.push({
            'path': _file_path,
            'created_at': info.ctime
        })
    })
    backupArr = backupArr.sort(function (a, b) {
        return b.created_at - a.created_at;
    })
    return gulp.src(__dirname + '/public/static.zip')
        .pipe(unzip())
        .pipe(gulp.dest(paths.src.dir));
}


//监听文件
var getType = function (file) {
    var filename = file;
    var index1 = filename.lastIndexOf(".");
    var index2 = filename.length;
    var type = filename.substring(index1 + 1, index2);
    return type;
}

var sleep = false;
var watchHandler = function (type, file) {
    var target = getType(file);

    util.log(file + ' has been' + type);
    switch (target) {
        case 'js':
            devMiniJs();
            break;
        case 'css':
            miniCSS();
            break;
        case 'html':
        case 'img':
        case 'media':
            copyResource();
            break;
    }

};


function watch(cb) {
    var watcher = gulp.watch([
        paths.src.dir + '/**/*.js',
        paths.src.dir + '/**/*.css'
    ], {
        ignored: /[\/\\]\./
    });

    watcher
        .on('change', function (file) {
            watchHandler('changed', file);
        })
        .on('add', function (file) {
            watchHandler('add', file);
        })
        .on('unlink', function (file) {
            watchHandler('removed', file);
        });

    cb();
}

//注册 build_dist 任务
gulp.task('build_dist', gulp.series(
    delDist,
    compileAutoprefixer,
    miniCSS,
    miniJs,
    copyResource,
    // backupStatic
));

//注册 build_dist 任务
gulp.task('build_dev', gulp.series(
    delDist,
    compileAutoprefixer,
    miniCSS,
    devMiniJs,
    copyResource,
    watch
));
