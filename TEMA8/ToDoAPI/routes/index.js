var express     = require('express');
var mongoose    = require('mongoose');
var moment      = require('moment');
var colors      = require('colors');
var jade        = require('jade');
// var passport    = require('passport');
var user        = require('../model/userModel');
var tarea       = require('../model/tareaModel.js');

var router      = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Index' });
});

/* GET list page. */
router.get('/list', tarea.All, function(req, res, next) {
    console.log('list')
    res.status(200).json( req.tareas );
});

// /* GET view page. */
router.get('/view/:id', tarea.ById, function(req, res, next) {
    // console.log(req.tarea)
    res.render('view', { title: 'View', tarea: req.tarea, moment: moment});
});

// /* Update dates and return to list page. */
router.get('/update/dates', tarea.All, function(req, res, next) {
    tl = req.tareas.length - 1
    newTareas = []
    req.tareas.forEach(function(item, index){
        tarea.findOneAndUpdate({_id: item._id}, {dateEdition: moment().format()}, {new: true}, function(err, data){
            newTareas.push(data);
            if(index === tl){
                res.render('list', { title: 'List', tareas: newTareas });
            }
        })
    });
});

/* CREATE PAGE */
router.route('/new')
    .get(user.isLoggedIn, function(req, res, next) {
        res.render('new', { title: 'New'});
    })
    .post(user.isLoggedIn, user.isLoggedIn, function(req, res, next) {

        t = new tarea({
            title       : req.body.title,
            description : req.body.description,
            tags        : req.body.tags.split(','),
            status      : req.body.status,
            dateEdition : moment().format(),
            createdBy   : req.user.username,
            editedBy    : req.user.username
        })

        t.save(function(err, newtarea) {
            if(err) return res.status(500).send( err.message);
            render = jade.renderFile('./views/card.jade', { tarea: newtarea, moment: moment})
            res.status(200).json(render)
        });
    });

/* EDIT PAGE */
router.route('/edit/:id')
    .get(user.isLoggedIn, tarea.ById, function(req, res, next) {
        console.log(req.params.id)
        res.render('edit', { title: 'Edit', tarea: req.tarea, moment: moment});
    })
    .post(user.isLoggedIn, tarea.ById, function(req, res, next) {
        var save = {}
        var b = req.body

        if(b.title)         save.title = b.title
        if(b.description)   save.description = b.description
        if(b.tags)          save['$push'] = { tags: { '$each': b.tags.split(',') }}
        save.status = b.status
        save.dateEdition = moment().format()
        save.editedBy = req.user.username

        tarea.findOneAndUpdate({_id: req.params.id}, save, {new: true}, function(err, newTareas){
            if(err) console.error(err)
            console.log(newTareas)
            res.render('edit', { title: 'Edit', tarea: newTareas, moment: moment });
        })
    })
    .delete(user.isLoggedIn, function(req, res, next) {
        tarea.findByIdAndRemove(req.params.id, function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).json('deleted');
        });
    })



module.exports = router;
