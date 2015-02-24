DB_TEMPLATE_NAME = 'template1';
DB_NAME = 'cookies_test';
DB_USERNAME = 'test';
DB_PASSWORD = '123';

DB_OPTIONS = {
    dialect: 'postgres',
    port: 49154,
    host: '127.0.0.1'
};

function getDb() {
    return new Sequelize(DB_TEMPLATE_NAME, DB_USERNAME, DB_PASSWORD, DB_OPTIONS);
}

databaseCreate = function(cb) {
    var start_db = getDb();
    start_db.query("SELECT datname FROM pg_catalog.pg_database WHERE datname = '" + DB_NAME + "'").then(function(dbs) {
        if (!dbs.length) {
            return start_db.query("CREATE DATABASE " + DB_NAME);
        }
    }).done(function() {
        cb();
    }).catch(function(error) {
        cb(error);
    });
};

databaseClean = function (cb) {
    getDb().query("DROP DATABASE IF EXISTS " + DB_NAME).done(function() {
        cb();
    }).catch(function(error) {
        cb(error);
    });
};
