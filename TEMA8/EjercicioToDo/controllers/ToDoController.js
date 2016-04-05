var express = require('express');
var router  = express.Router();
var ToDo    = require('../models/ToDo');

router.route('/')
	.get(function(req, res){
		// Obtenemos todas la tareas
		ToDo.find(function(err, list){
			// Comprobamos si podemos trabajar con el formato json
			if(req.accepts('json')){
			//Si encontramos algún tipo de error, lo notificamos
			if(err){
				return res.status(500).json({message: 'Error obteniendo las tareas'});
			}
			// Si no hay error montamos un json a partir de la lista de tareas
			return res.json(list);
			}
			else{
				res.send ('No acepta JSON');
			}
		});
	})

	.post(function(req, res){
		// Creamos la tarea a partir de los parámetros de la petición

		console.log("body" , req.body)

		var tarea = new ToDo({
			// En req.body tenemos todos los parámetros almacenados
			// en nuestra petición POST
			'titulo': req.body.titulo,
			'completa': req.body.completa
		});
		// Salvamos la tarea que acabamos de crear y comprobamos
		// los errores.
		tarea.save(function(err, t){
			if(req.accepts('json')){
				if(err){
					return res.status(500).json({message: "Error guardando la tarea", error: err});
				}
				return res.json({message: "Salvado", _id: t._id, complete: JSON.stringify(t)});
			}
			else{
				res.send("No acepta JSON");
			}
		});
	})

	.delete(function(req, res, next){
		console.log("body" , req.body)
		ToDo.findOneAndRemove({titulo: req.body.titulo}, null, function(err, doc, result){
			if(err){
				res.status(500).json({message: "Error borrando la tarea", error: err});
			}
			return res.json({message: "Borrado", _id: doc});
		})
	})

	.put(function(req, res, next){
		console.log("body" , req.body)
		ToDo.findOneAndUpdate({titulo: req.body.titulo}, {completa: req.body.completa}, null, function(err, doc, result){
			if(err){
				res.status(500).json({message: "Error editando la tarea", error: err});
			}
			return res.json({message: "Editado", _id: doc});
		})
	})



router.get('/tarea/:id', function(req, res){
	// En el objeto params podemos obtener los elementos
	// que obtengamos en la url
	var id = req.params.id;
	// Hacemos la búsqueda en la base de datos y manejamos los errores
	ToDo.findOne({_id:id}, function(err, tarea){
		if (req.accepts('json')){
			if(err){
				return res.status(500).json({message: 'Error obteniendo la tarea'});
			}
			if(!tarea){
				return res.json({message: "No se ha podido obtener la tarea"});
			}
			return res.json(tarea);
		}
		else{
			res.send("No acepta JSON");
		}
	});
});


router.get('/restart', function(req, res){

	ToDo.find({}, function(err, result){
		if(err){
			console.error(err);
			return res.status(500).json({message: 'Error obteniendo las tareas', error: err});
		}
		result.forEach(function(t) {
			ToDo.findOneAndRemove({_id: t._id}, null, function(err, doc, result){
				if(err){
					console.warn(err);
				}
			});
		});
		ToDo.find({}, function(err, result){
			return res.status(200).json({Tareas: result});
		});
	});
});

module.exports = router;