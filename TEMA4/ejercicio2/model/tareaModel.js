
var mongoose = require('mongoose');

var tarea_schema = mongoose.Schema({
								title: {"type":"string"},
								description: {"type":"string"},
								tags: {"type":"object"},
								dateEdition: { type: Date },
								dateCreation:{ type: Date, default: Date.now },
							});



tareaModel = mongoose.model('tarea', tarea_schema);

tareaModel.All = function(req, res, next){
    tareaModel.find(function(err, tareas){
        if(err){
            return res.status(err.status || 500).render('error', {
                                                    message: err.message,
                                                    error: err
                                                });
        }
        req.tareas = tareas
        next()
    })
}

tareaModel.ById = function(req, res, next){
    tareaModel.findOne({_id: req.params.id}, function(err, tarea){
        if(err){
            return res.status(err.status || 500).render('error', {
                                                    message: err.message,
                                                    error: err
                                                });
        }
        req.tarea = tarea
        next()
    })
}


module.exports = tareaModel