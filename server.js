const express = require('express'),
      todoController = require('./controllers/todoController'),
      app = express();

/*setting template engine*/
app.set('view engine', 'ejs');
/*End of setting template engine*/

/*setting static files directory to generally see public*/
app.use(express.static('./public'));
/*End of setting static files directory to generally see public*/

/*firing the todoController function*/
todoController(app);
/*End of firing the todo controller function*/

/*Firing the done controller function*/
//app.use('/done', doneController)
/*End of Firing the done controller function*/


/*listen to a port*/
app.listen(process.env.PORT || 9000, () => {console.log('s3rv3r on! @ port:9000')})
/*End of listening to a port*/