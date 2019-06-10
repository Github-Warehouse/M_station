export default {
    get(url) {
        return $.ajax({
            url,
            type: 'get'
        }).done(function(data){
            return data
        })
    }
}