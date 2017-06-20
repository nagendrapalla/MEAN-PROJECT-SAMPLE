var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://nagendra:password@ds131782.mlab.com:31782/samplemongo_nag', ['tasks']);

//Get All Tasks
router.get('/tasks', function (req, res, next) {
    db.tasks.find(function (err, tasks) {
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    });
});

//Get Single Task
router.get('/task/:id', function (req, res, next) {
    db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

//Save Task
router.post('/task', function (req, res, next) {
    var task = req.body;
    if (!task.title || (task.isDone + '')) {
        res.status(400);
        res.json({
            'Error': "Bad Request"
        });
    } else {
        db.tasks.save(task, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });
    }
});

//Remove Task
router.get('/task/:id', function (req, res, next) {
    db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

//Update Task
router.put('/task/:id', function (req, res, next) {
    var task = req.body;
    var updtask = {};

    if (task.isDone) {
        updtask.isDone = task.isDone
    }

    if (task.title) {
        updtask.title = task.title
    }

    if (!updtask) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.update({ _id: mongojs.ObjectId(req.params.id) }, updtask, {}, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });
    }

})


module.exports = router;