const positionTpl = require('../views/position.html')
const positionListTpl = require('../views/position.list.html')
const BScroll = require('better-scroll').default

import fetch from '../models/fetch'

// const gotoPage = id => {
//     let router = new Router({
//         mode: 'hash'
//     })
//     router.push('/index/details?id=' + id)
// }

const renderList = async () => {

    $('main').html(positionTpl)

    let data = await fetch.get('/json/result')

    let renderpositionListTplListTpl = template.render(positionListTpl, { data })
    $(".m-commodity").html(renderpositionListTplListTpl)


    // 实例化 Better scroll
    // let bScroll = new BScroll('#index-scroll', {
    //     probeType: 1,
    //     click: true
    // })


    // let head = $('.head img'),
    //     topImgHasClass = head.hasClass('up')
    // let foot = $('.foot img'),
    //     bottomImgHasClass = head.hasClass('down')

    // 初始化位置
    // bScroll.scrollTo(0, -40)

    // 绑定滑动事件
    // bScroll.on('scroll', function () {
    //     let y = this.y
    //     let maxY = this.maxScrollY - y
    //     if (y >= 0) {
    //         !topImgHasClass && head.addClass('up')
    //         return
    //     }
    // })

    // 手指松开触发事件
    // bScroll.on('scrollEnd', async function () {
    //     // 下拉刷新处理
    //     if (this.y>=-40&&this.y<0) {
    //         this.scrollTo(0,-40)
    //         head.removeClass('up')
    //     }else if (this.y>=0) {
    //         head.attr('src','/images/ajax-loader.gif')
    //     }
    // })

    // $(".title").mouseenter(function (e) {
    //     var thisWidth = $(this).width(); // div 的宽度
    //     console.log(thisWidth);
    //     var wordWidth = $(this)[0].scrollWidth; // 先转为js对象; 文字的宽度
    //     if(wordWidth > thisWidth+5){ // 加5是为了让div宽度多一点,比文字不超出时多宽,因为文字不超出,那么宽度为div的宽度
    //         $(this).siblings('span.title').html($(this).text()).show();
    //     }

    // })
    // $(".title").mouseleave(function () {
    //     // layer.msg('显示')
    //     $(this).siblings('span.title').hide();
    // })
}

export default {
    renderList
}