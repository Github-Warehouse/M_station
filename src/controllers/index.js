const indexListTpl = require('../views/index.list.html')

import fetch from '../models/fetch'

const renderList = async () => {
    let data = await fetch.get('/json/result')
    let renderindexListTpl = template.render(indexListTpl, {data})
    $(".m-commodity").html(renderindexListTpl)
}

export default {
    renderList
}