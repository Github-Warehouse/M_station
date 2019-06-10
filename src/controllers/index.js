const indexListTpl = require('../views/index.list.html')

import fetch from '../models/fetch'

const renderList = async () => {
    let data = await fetch.get('/json/result')
    let renderindexListTpl = template.render(indexListTpl, {data})
    $(".m-commodity").html(renderindexListTpl)

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