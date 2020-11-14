const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//connect to the database
mongoose
    .connect(
        'mongodb+srv://Chayan154:Mongodb154@clustertodo.acp13.mongodb.net/Todo?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .catch((error) => console.log(error));

// MongoClient helper code//
// const MongoClient = require('mongodb').MongoClient;
// const uri =
//     'mongodb+srv://Chayan154:Mongodb154@clustertodo.acp13.mongodb.net/Todo?retryWrites=true&w=majority';
// const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
// client.connect((err) => {
//     const collection = client.db('test').collection('devices');
//     // perform actions on the collection object
//     client.close();
// });

var todoSchema = new mongoose.Schema({
    item: String,
});

var Todo = mongoose.model('Todo', todoSchema);

// var data = [
//     { item: 'get milk' },
//     { item: 'throw trash' },
//     { item: 'code todo list' },
// ];

const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
    //
    app.get('/todo', function (req, res) {
        //get data from mongodb and pass it to view
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
        });
    });
    //
    app.post('/todo', urlencodedParser, function (req, res) {
        //get data from view and add to mongodb
        var newTodo = Todo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json({ todos: data });
        });
    });
    //
    app.delete('/todo/:item', function (req, res) {
        //delete the requested item from mongodb
        Todo.find({ item: req.params.item.replace(/\-/g, ' ') }).deleteOne(
            function (err, data) {
                if (err) throw err;
                res.json({ todos: data });
            }
        );
    });
};
