const { src, dest, series, watch, parallel } = require('gulp')
const webserver = require('gulp-webserver')
const del = require('del')
const sass = require('gulp-sass')
const webpackStream = require('webpack-stream')
const path = require('path')
const proxy = require('http-proxy-middleware')

function copyHTML() {
    return src('./*.html')
        .pipe(dest('./dev'))
}

function packCSS() {
    return src('./src/styles/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./dev/styles'))
}

function packJS() {
    return src('./src/**/*')
        .pipe(webpackStream({
            mode: 'development',
            // 入口文件
            entry: {
                app: './src/app.js'
            },
            // 出口文件
            output: {
                filename: '[name].js',
                path: path.resolve(__dirname, './dev')
            },
            // ES6-ES8 代码转换成ES5
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader'
                        }
                    },
                    {
                        test: /\.html$/,
                        loader: 'string-loader'
                    }
                ]
            }
        }))
        .pipe(dest('./dev/scripts'))
}

function copyLibs() {
    return src('./src/libs/**/*')
        .pipe(dest('./dev/libs'))
}

function copyImages() {
    return src('./src/images/**/*')
        .pipe(dest('./dev/images'))
}

function copyIcons() {
    return src('./src/icons/**/*')
        .pipe(dest('./dev/icons'))
}

function server() {
    return src('./dev')
        .pipe(webserver({
            host: 'localhost',
            port: 9528,
            livereload: true,
            middleware: [
                proxy('/api', {
                    target: 'https://m.lagou.com',
                    changeOrigin: true, // 访问不同的域名，需要配置成 true
                    pathRewrite: {
                        '^/api': ''
                    }
                }),
                proxy('/json', {
                    target: 'http://localhost:5500',
                    pathRewrite: {
                        '^/json': ''
                    }
                })
            ]
        }))
}

function clear(target) {
    return function () {
        return del(target)
    }
}

function watching() {
    watch('./*.html', series(clear('./dev/*.html'), copyHTML))
    watch('./src/styles/**/*', series(packCSS))
    watch(['./src/**/*', '!src/libs/**/*', '!src/icons/**/*', '!src/images/**/*'], series(packJS))
    watch('./src/libs/**/*', series(clear('./dev/libs'), copyLibs))
    watch('./src/images/**/*', series(clear('./dev/images'), copyImages))
    watch('./src/icons/**/*', series(clear('./dev/icons'), copyIcons))
}

exports.default = series(parallel(packCSS, packJS, copyLibs, copyImages, copyIcons), copyHTML, server, watching)