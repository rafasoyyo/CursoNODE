
var mongoose = require('mongoose');

var tarea_schema = mongoose.Schema({
								title: {"type":"string"},
								description: {"type":"string"},
								tags: {"type":"object"},
								dateEdition: { type: Date },
								dateCreation:{ type: Date, default: Date.now },
							});

module.exports = mongoose.model('tarea', tarea_schema);