
/*this is the controller for manipulating the data and urls of the todo request*/
module.exports = function (app) {


    /*setting up GET request for the app itself*/
    app.get('/', (req, res) => {
        res.render('todo');
    });
    /*End of setting up get request for the app itself*/

    /*setting up post request for the app itself*/
    app.post('/todo', (req, res) => {
        res.render('todo');
    });
    /*End of setting up post request for the app itself*/

    app.delete('/todo', (req, res)=> {
        res.render('todo');
    });

};