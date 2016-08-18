var sql = require('mssql');
var deferred = require('deferred');


var SQLconfig = {
    user: 'sa',
    password: 'ssecure',
    server: '10.3.72.18', 
    database: 'SSO2'
};


module.exports = {

    query: function (_query, _parameterList) {
        var def = deferred();

        sql.connect(SQLconfig).then(function () {
            var request = new sql.Request();
            //Cargo los parámetros
            for (var i=0; i< _parameterList.length; i++)
            {
                request.input(_parameterList[i].name, _parameterList[i].value);
            }            
            var query = _query;
            
            request.query(query).then(function (recordset) {
                def.resolve(recordset);
            }).catch(function (err) {
                console(err);
                def.reject(err);
            });
        }).catch(function (err) {
            console(err);
            def.reject(err);
        });
        return def.promise;
    }
}

