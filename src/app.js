const indexTpl = require('./views/index.html')
const renderIndexTpl = template.render(indexTpl, {})

import indexController from './controllers/index'
$('#app').html(renderIndexTpl)
indexController.renderList()