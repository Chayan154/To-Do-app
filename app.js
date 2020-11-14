const express = require('express');
const todoController = require('./controllers/todoController');

const app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('public'));

//fire controllers
todoController(app);

//listen to port
app.listen(3000, () => {
    console.log('Server running at 127.0.0.1:3000');
});
