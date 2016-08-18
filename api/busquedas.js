

var app = require("express");
var router = app.Router();

var sql = require("../modules/sqlserver");

//Busco usuarios
router.get("/search/user/:q", function (req, res) {
  var params=[{name:'q', value:'%'+req.params.q+'%'}];
  console.log(req.params.q);
  sql.query("Select id, username, name, surname  from SSO_Users Where surname like @q or username like @q", params).then(function (resultados) {
    res.json(resultados);
  });
});

//Busco ubicaciones
router.get("/search/ubicaciones", function (req, res) {
  var params=[];  
  sql.query("SELECT codigo, padre, nombre  FROM [SSO].[dbo].[hsp_Ubicaciones_DevolverArbol] (170,7) where despacho_habilitado = 1", params).then(function (resultados) {
    res.json(resultados);
  });
});
    



module.exports = router;
