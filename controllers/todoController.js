const bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      dotenv = require('dotenv'),
      async = require('async'),
      db = mongoose.connection;
      
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

/*Getting feedbacks for datbase connections*/
    db.on('error', console.error.bind(console, 'there was an error in connecting to the database in todoController'));
    db.once('open', () => {console.log('connection to database esthablished in todoController')});
    /*End of getting database connection information*/
/*Creating mongoose todo schema (it works more like a blue print for mongoose)*/
const todoSchema = new mongoose.Schema({
    item: String
    }),
    /*End of creating schema*/

        /*Creating mongoose done schema (it works more like a blue print for mongoose)*/
    doneSchema = new mongoose.Schema({
        item: String
    });
    /*End of creating schema*/
    /*creating mongoose Todo models*/
    Todo = mongoose.model('Todo', todoSchema),
    /*End of creating mongoose models*/
    /*creating mongoose Done model*/
    Done = mongoose.model('Done', doneSchema);
    /*End of creating mongoose Done model*/
        


     var item = Todo({item:' req.body'});
     var task = Done({item:' req.body'});
    



module.exports = function (app) {


   /*setting up GET request for the app itself*/
   app.get('/', (req, res) => {

        /*get and name tasks from DB*/
        var doneTasks,
            todoTasks;
        /*End of getting tasks from DB*/

        /*Using Async to query from DB*/
        async.series([function(callback){
            Todo.find({},function(err,todo){
                if(err) console.log('error from querying todo tasks from DB : ' + err);
                todoTasks = todo;
                callback(null, todo);
            })
        },function(callback){
            Done.find({},function(err, done){
                if(err) console.log('error from querying Done tasks from DB : ' + err);
     
                doneTasks = done;
                callback(null, done);
            });
        }],function(err){
            res.render('todo',
                     {todos: todoTasks,
                      doneTask: doneTasks});
        });
        /*End of Using Async to query from DB*/
      
   });
   /*End of setting up get request for the app itself*/

   /*setting up post request to add an item*/
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
               res.json(data)   ;
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
               console.log('item deleted')
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

    /*Function for deleting done tasks*/
    app.delete('/done/:item', (req, res) => {
            Done.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data) => {
                if (err) {
                    console.log('error in deleting Done Tasks: ' + err);
                } else {
                    console.log('Done tasks deleted')
                    res.json(data);
                };
            });
    });
    /*End of Function for deleting done tasks*/
    

   /*updating items*/
   app.post('/todo/edit/:item',urlencodedParser, (req, res) => {

       /*getting data from view and adding it to database but also making sure that its not an empty string*/
       let item = {},
           query = {_id: req.params.id};

         Todo.update(query, item, (err, data) => {
           if (err) {
               console.log('error in saving item: ' + err);
               /*include flash message in future times*/
           } else {
               console.log('item updated');
               res.json(data);
           };
       });
       /*trying to save item to database*/

      
   });
   /*End of updating items*/

};          