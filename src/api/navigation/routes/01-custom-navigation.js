module.exports = {
    routes : [
        {
            method : 'GET',
            path : '/navigations',
            handler :  'navigation.findNavigations',
            config : {
                policies : [] 
            }
        }
    ]
}