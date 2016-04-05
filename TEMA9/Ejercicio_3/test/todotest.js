var supertest = require("supertest");
var should = require("should");
var ToDo    = require('../models/ToDo');

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");

// UNIT test begin
describe("Ejemplo de test",function(){
	it("Deberia de devolverme un listado",function(done){
		// llamada a la api
		server
		.get("/api")
		.expect("Content-type",/json/)
			.expect(200) // La respuesta HTTP
			.end(function(err,res){
				// El status HTTP debería ser (should) 200
				res.status.should.equal(200);
				done();
			});
		});

	it("me tiene que dar 404",function(done){
		server
			// Esta url no existe. Me merezco un 404
			.get("/tareas")
			.expect(404)
			.end(function(err,res){
				res.status.should.equal(404);
				done();
			});
	});

	it("add todo",function(done){
		//calling ADD api
		server
			.post('/api')
			.send({"titulo":"Test Tdd","completa":0})
			.expect("Content-type",/json/)
			.expect(201)
			.end(function(err,res){
				// 201 Created: The request has been fulfilled and resulted in a new resource being created.
				res.status.should.equal(201);
				res.body.message.should.equal('Salvado');done();
			});
	});

	it("creamos ToDo y lo editamos",function(done){
		var tarea = new ToDo({
			'titulo': 'mocha test put',
			'completa': 0
		});

		tarea.save(function(err, data) {
			//console.log('#PUT /api/'+data.id);
			server
				.put('/api/'+data.id)
				.send({"titulo":"mocha test put OK","completa":1})
				.end(function(err, res){
					res.status.should.equal(200);
					res.should.be.json;
					res.body.should.have.property('message');
					res.body.message.should.equal('Actualizada');
					done();
				});
		});//save
	});

	it("creamos ToDo, lo editamos y lo borramos",function(done){
		var tarea = new ToDo({
			'titulo': 'mocha test put',
			'completa': 0
		});

		tarea.save(function(err, data) {

			server
				.put('/api/'+data.id)
				.send({"titulo":"Para borrar","completa":1})
				.end(function(err, res){
					res.status.should.equal(200);
					res.should.be.json;
					res.body.should.have.property('message');
					res.body.message.should.equal('Actualizada');
				})

			server
				.delete('/api/')
				.send({"titulo":"Para borrar"})
				.end(function(err, res){
					res.status.should.equal(200);
					res.should.be.json;
					res.body.should.have.property('message');
					res.body.message.should.equal('Borrado');
					done();
				});
		});//save
	});
});