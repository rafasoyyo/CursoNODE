var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');
var colors = require('colors');

var router = express.Router();
var tarea = require('../model/tareaModel.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('index')
    
    // console.log(tarea)
    tarea.find(function(err, tareas){
        // console.log(moment().format();)
        if(err){
            return res.status(err.status || 500).render('error', {
                                                    message: err.message,
                                                    error: err
                                                });
        }

        res.render('index', { title: 'Index' });

    });
});

/* GET list page. */
router.get('/list', function(req, res, next) {

    console.log('list')
    // console.log(tarea)
    tarea.find(function(err, tareas){
        console.log(tareas)
        if(err){
            return res.status(err.status || 500).render('error', {
                                                    message: err.message,
                                                    error: err
                                                });
        }
        res.render('list', { title: 'List', tareas: tareas });
    })
});

/* GET view page. */
router.get('/view/:id', function(req, res, next) {

    console.log(req.params.id)
    // console.log(tarea)
    tarea.findOne({_id: req.params.id}, function(err, tarea){
        console.log(tarea)
        if(err){
            return res.status(err.status || 500).render('error', {
                                                    message: err.message,
                                                    error: err
                                                });
        }
        res.render('view', { title: 'View', tarea: tarea, moment: moment});
    })
});

/* GET view page. */
router.get('/update/dates', function(req, res, next) {
    tarea.find(function(err, tareas){

        if(err){
            return res.status(err.status || 500).render('error', {
                                                    message: err.message,
                                                    error: err
                                                });
        }

        tl = tareas.length - 1
        newTareas = []
        tareas.forEach(function(item, index){
            tarea.findOneAndUpdate({_id: item._id}, {dateEdition: moment().format()}, {new: true}, function(err, data){
                newTareas.push(data);
                if(index === tl){
                    res.render('list', { title: 'List', tareas: newTareas });
                }
            })
        });

    });
});


module.exports = router;
