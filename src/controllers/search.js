const searchTpl = require('../views/search.html')
const searchListTpl = require('../views/search.list.html')
import fetch from '../models/fetch'

const renderSearchList = async () => {

    $('main').html(searchTpl)

    let dataList = await fetch.getPosition('/api/h5/hotKey.html?t=1560387622329')
    let data = dataList.body.result.keyOutBox
    let renderSearchListTpl = template.render(searchListTpl, { data })
    $('.m-hotwordlist').html(renderSearchListTpl)

}

export default {
    renderSearchList
}