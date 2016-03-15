
var http = require("http");
var url = require("url");
var operaciones = require('./operaciones');

var htmlizer = function(p, response){     

    var html = '<!DOCTYPE html>' +
                '<html>' +
                    '<head>' +
                        '<meta charset="utf-8" />' +
                        '<title>' + p + '</title>' +
                    '</head>' +
                    '<body>' + response + '</body>' +
                '</html>';
    return html
}

var server = http.createServer(function (peticion, respuesta){

    var pathname = url.parse(peticion.url, true).pathname;
    var num1 = url.parse(peticion.url, true).query.numero1;
    var num2 = url.parse(peticion.url, true).query.numero2;

    p = pathname.replace(/\//, "")

    if(operaciones[p]){
        var result = operaciones[p](num1, num2)
        var response = isNaN(result) ? '<p>Error en url</p>' :  '<p>' + 'La operación ' + p + ' da como resultado ' + operaciones[p](num1, num2) + '</p>' 
        respuesta.end(htmlizer(p,response));
    }
    else{
        respuesta.end(htmlizer(null, '<p>Error en url</p>'));
    }
});

server.listen(3000, function(){
    console.log("tu servidor está listo en " + this.address().port);
});