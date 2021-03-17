var DBconfigs = {
    localdb: {
        urldb : 'mongodb://localhost:27017/shopoanh',
        dbname : "shopoanh",
        dbusername : "",
        dbpassword : "",
    },

    clouddb: {
        urldb : "mongodb+srv://kieuoanh:<031220>@cluster0.nciwy.mongodb.net/<dbname>?retryWrites=true&w=majority",
        dbname : "shopoanh",
        dbusername : "",
        dbpassword : "",
    }

};

module.exports = DBconfigs.localdb;