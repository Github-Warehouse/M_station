const { src, dest, series, watch, parallel } = require('gulp')
const sass = require('gulp-sass')
const webpackStream = require('webpack-stream')
const path = require('path')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')
const cleanCSS = require('gulp-clean-css')

function copyHTML() {
    return src('./*.html')
        .pipe(dest('./dist'))
}

function packCSS() {
    return src('./src/styles/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rev())
        .pipe(dest('./dist/styles'))
        .pipe(rev.manifest())
        .pipe(dest('./rev/styles'))
}

function packJS() {
    return src('./src/**/*')
        .pipe(webpackStream({
            mode: 'production',
            // 入口文件
            entry: {
                app: './src/app.js'
            },
            // 出口文件
            output: {
                filename: '[name].js',
                path: path.resolve(__dirname, './dist')
            },
            // ES6-ES8 代码转换成ES5
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                                plugins: ['@babel/plugin-transform-runtime']
                            }
                        }
                    },
                    {
                        test: /\.html$/,
                        loader: 'string-loader'
                    }
                ]
            }
        }))
        .pipe(rev())
        .pipe(dest('./dist/scripts'))
        .pipe(rev.manifest())
        .pipe(dest('./rev/scripts'))
}

function revColl() {
    return src(['./rev/**/*.json', './dist/*.html'])
        .pipe(revCollector())
        .pipe(dest('./dist'))
}

function copyLibs() {
    return src('./src/libs/**/*')
        .pipe(dest('./dist/libs'))
}

function copyImages() {
    return src('./src/images/**/*')
        .pipe(dest('./dist/images'))
}

function copyIcons() {
    return src('./src/icons/**/*')
        .pipe(dest('./dist/icons'))
}

exports.default = series(parallel(packCSS, packJS, copyLibs, copyImages, copyIcons), copyHTML, revColl)