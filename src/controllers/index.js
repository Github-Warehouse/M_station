const indexTpl = require('../views/index.html')
const renderIndexTpl = template.render(indexTpl, {})

import positionController from './position'

export default {
    render() {
        $('#app').html(renderIndexTpl)
        positionController.renderList()
    }
}