const positionTpl = require('../views/position.html')
const searchTpl = require('../views/search.html')
const loginTpl = require('../views/login.html')
const registerTpl = require('../views/register.html')
const router = {
    renderView() {
        let hash = location.hash

        switch (hash) {
            case '#position':
                $('main').html(positionTpl)
                break;
            case '#search':
                $('main').html(searchTpl)
                break;
            case '#login':
                $('main').html(loginTpl)
                break;
            case '#register':
                $('main').html(registerTpl)
                break;
            default:
                $('main').html(positionTpl)
        }
        $(`.navlist a[href='${hash}']`).closest('li').addClass('active').siblings().removeClass('active')
    },

    init() {
        window.addEventListener('load', this.renderView)
        window.addEventListener('hashchange', this.renderView)
    }
}

export {
    router
}