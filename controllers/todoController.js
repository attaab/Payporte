const bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      dotenv = require('dotenv');
      
    /*Firing the dotenv config function*/
    dotenv.config();
    /*End of firing the config function*/

/*Data masking the todo app*/
 // var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}],
/*End of data masking the todo app*/
     urlencodedParser = bodyParser.urlencoded({extended: false});
/*this is the controller for manipulating the data and urls of the todo request*/

/*connection to database*/
mongoose.connect(process.env.DB_CONNECT);
/*End of connection to database*/

/*Creating mongoose schema (it works more like a blue print for mongoose)*/
const todoSchema = new mongoose.Schema({
    item: String
    }),
    /*End of creating schema*/

    /*creating mongoose models*/
    Todo = mongoose.model('Todo', todoSchema);
    /*End of creating mongoose models*/

     var item = Todo({item:' req.body'});


module.exports = function (app) {


    /*setting up GET request for the app itself*/
    app.get('/', (req, res) => {
        /*getting data from Db and passing it to the view*/
        Todo.find({}, (err, data) => {
            if (err) {
                /*put in  flash message to display error in future times*/
                console.log('Error from retriving item from data base: '+ err);
                res.render('todo')/*i still made it to render the homepage*/
            } else {
                /*rendering home page*/
                res.render('todo', {todos: data});
            };
        });
       
    });
    /*End of setting up get request for the app itself*/

    /*setting up post request for the app itself*/
    app.post('/todo',urlencodedParser, (req, res) => {
        /*appending the clients request to the data array(used during data masking)*/
        // data.push(req.body);
        /*End of appending the clients request to the data array*/

        /*getting data from view and adding it to database but also making sure that its not an empty string*/
        if (req.body !== " ") {
            
         var newTodo = Todo(req.body).save((err, data) => {
            if (err) {
                console.log('error in saving item: ' + err);
                /*include flash message in future times*/
            } else {
                console.log('item saved');
                res.json(data);
            };
        });
        }
        /*trying to save item to database*/

       
    });
    /*End of getting data from view and adding it to database but also making sure that its not an empty string*/

    app.delete('/todo/:item', (req, res) => {
        /*Delete the requested item from DB*/
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data) => {
            if (err) {
                console.log('error in deleting item: ' + err);
            } else {
                res.json(data);
            };
        });
        /*End of deleting the requested item from DB*/

        /*here we select the data variable that holds the todo task and filter out the list we want to delete (used during data masking)*/
        // data = data.filter(function (todo) {
        //     /*here we match the item from the url to the item in list by replacing hypens with spaces and if it is available on the list it returns true*/
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        // /*responding with JSON*/
        // res.json(data);
        // /*End of responding with JSON*/
    });

};