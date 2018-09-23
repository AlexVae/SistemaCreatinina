// middleware para el manejo de sesiones
var _SESSION;

// the middleware function
module.exports = function() {
    return function(req, res, next) {
        _SESSION = req.session;
/*
  Para mandar las variables de sesión al JADE y poder utilizarlas
  a placer.
  @autor ovaldez
  @since 21/09/2015
*/
            var origRender = res.render;
            res.render = function (view, locals, callback) {
                if ('function' == typeof locals) {
                    callback = locals;
                    locals = undefined;
                }
                if (!locals) {
                    locals = {};
                }
                locals.req = req;
                origRender.call(res, view, locals, callback);
            };
//OFVC - Se termina
          if ( _SESSION.ACTIVA ){
             next();
          } else {
             res.render('index', {error:"No ha iniciado sesión"});
          }	
    }
};