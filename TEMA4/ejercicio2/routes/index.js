var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');
var colors = require('colors');
var jade = require('jade');

var router = express.Router();
var tarea = require('../model/tareaModel.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Index' });
});

/* GET list page. */
router.get('/list', tarea.All, function(req, res, next) {
    res.render('list', { title: 'List', tareas: req.tareas });
});

// /* GET view page. */
router.get('/view/:id', tarea.ById, function(req, res, next) {
    res.render('view', { title: 'View', tarea: req.tarea, moment: moment});
});

// /* Update dates and return to list page. */
router.get('/update/dates', tarea.All, function(req, res, next) {
    tl = req.tareas.length - 1
    newTareas = []
    req.tareas.forEach(function(item, index){
        console.log(item)
        tarea.findOneAndUpdate({_id: item._id}, {dateEdition: moment().format()}, {new: true}, function(err, data){
            newTareas.push(data);
            if(index === tl){
                res.render('list', { title: 'List', tareas: newTareas });
            }
        })
    });
});


// /* GET new page. */
router.route('/new')
    .get(function(req, res, next) {
        res.render('new', { title: 'New'});
    })
    .post(function(req, res, next) {

        t = new tarea({
            title :         req.body.title,
            description :   req.body.description,
            tags :          req.body.tags.split(','),
            status :        req.body.status,
            dateEdition :   moment().format()
        })
        console.log(req.body)
        t.save(function(err, newtarea) {
            if(err) return res.status(500).send( err.message);
            render = jade.renderFile('./views/card.jade', { tarea: newtarea, moment: moment})
            res.status(200).json(render)
        });
    });


// /* GET view page. */
router.route('/edit/:id')
    .get(tarea.ById, function(req, res, next) {
        console.log(req.params.id)
        res.render('edit', { title: 'Edit', tarea: req.tarea, moment: moment});
    })
    .post(tarea.ById, function(req, res, next) {
        var save = {}
        var b = req.body

        if(b.title)         save.title = b.title
        if(b.description)   save.description = b.description
        if(b.tags)          save['$push'] = { tags: { '$each': b.tags.split(',') }}
        save.status = b.status
        save.dateEdition = moment().format()

        tarea.findOneAndUpdate({_id: req.params.id}, save, {new: true}, function(err, newTareas){
            if(err) console.error(err)
            console.log(newTareas)
            res.render('edit', { title: 'Edit', tarea: newTareas, moment: moment });
        })
    })
    .delete(function(req, res, next) {
        tarea.findByIdAndRemove(req.params.id, function(err) {
            if(err) return res.status(500).send(err.message);
            console.log('delete')
            res.status(200).json('deleted');
        });
    })



module.exports = router;
