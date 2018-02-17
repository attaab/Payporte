const bodyParser = require('body-parser'),
/*Data masking the todo app*/
     data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}],
/*End of data masking the todo app*/
     urlencodedParser = bodyParser.urlencoded({extended: false});

/*this is the controller for manipulating the data and urls of the todo request*/
module.exports = function (app) {


    /*setting up GET request for the app itself*/
    app.get('/', (req, res) => {
        res.render('todo', {todos: data});
    });
    /*End of setting up get request for the app itself*/

    /*setting up post request for the app itself*/
    app.post('/todo',urlencodedParser, (req, res) => {
        /*appending the clients request to the data array*/
        data.push(req.body);
        /*End of appending the clients request to the data array*/

        res.json(data);
    });
    /*End of setting up post request for the app itself*/

    app.delete('/todo/:item', (req, res)=> {
        /*here we select the data variable that holds the todo task and filter out the list we want to delete*/
        data = data.filter(function (todo) {
            /*here we match the item from the url to the item in list by replacing hypens with spaces and if it is available on the list it returns true*/
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        /*responding with JSON*/
        res.json(data);
        /*End of responding with JSON*/
    });

};