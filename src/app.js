import indexController from './controllers/index'
import positionController from './controllers/position'
import searchController from './controllers/search'
import {router} from './router/hash'

indexController.render()
positionController.renderPositonList()
searchController.renderSearchList()

router.init()