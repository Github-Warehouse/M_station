export default {
    getPosition(url) {
        return $.ajax({
            url,
            type: 'get'
        }).done(function(data){
            return data
        })
    },
    getSearch(url){
        return $.ajax({
            url,
            type:'get'
        }).done(function(data){
            return data
        })
    }
}