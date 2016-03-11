
var http = require("http");
var url = require("url");
var operaciones = require('./operaciones');

var server = http.createServer(function (peticion, respuesta){

    var pathname = url.parse(peticion.url, true).pathname;
    var num1 = url.parse(peticion.url, true).query.numero1;
    var num2 = url.parse(peticion.url, true).query.numero2;

    p = pathname.replace(/\//, "")
    if(operaciones[p]){
        var html = '<!DOCTYPE html>' +
                    '<html>' +
                        '<head>' +
                            '<meta charset="utf-8" />' +
                            '<title>' + p + '</title>' +
                        '</head>' +
                        '<body>' +
                            '<p>' + 'La operación ' + p + ' da como resultado ' + operaciones[p](num1, num2) + '</p>' +
                        '</body>' +
                    '</html>';
        respuesta.end(html);
    }
    else{
        respuesta.end();
    }
});

server.listen(3000, function(){
    console.log("tu servidor está listo en " + this.address().port);
});