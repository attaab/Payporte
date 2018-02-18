// const doneRouter = express.Router(),
//     bodyParser = require('body-parser'),
//     mongoose = require('mongoose'),
//     dotenv = require('dotenv'),
//     db = mongoose.connection;

// /*Firing the dotenv config function*/
// dotenv.config();
// /*End of firing the config function*/

// /*Data masking the todo app*/
// // var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}],
// /*End of data masking the todo app*/
// urlencodedParser = bodyParser.urlencoded({extended: false});
// /*this is the controller for manipulating the data and urls of the todo request*/

// /*connection to database*/
// mongoose.connect(process.env.DB_CONNECT);
// /*End of connection to database*/

// /*Getting feedbacks for datbase connections*/
// db.on('error', console.error.bind(console, 'there was an error in connecting to the database in doneController'));
// db.once('open', () => {console.log('connection to database esthablished in doneController')});
// /*End of getting database connection information*/

// /*Creating mongoose done schema (it works more like a blue print for mongoose)*/
// doneSchema = new mongoose.Schema({
//     item: String
//  }),
//  /*End of creating schema*/
 
//     /*creating mongoose Done model*/
//     Done = mongoose.model('Done', doneSchema);
//     /*End of creating mongoose Done model*/
    
//   var task = Done({item:' req.body'});

// module.exports = () => {

//     doneRouter.get('/', (req, res) => {
//         /*getting data Done from Db and passing it to the view*/
//         Done.find({}, (err, data) => {
//             if (err) {
//                 /*put in  flash message to display error in future times*/
//                 console.log('Error from retriving Done tasks from data base: '+ err);
//                 res.render('todo')/*i still made it to render the homepage*/
//             } else {
//                 /*rendering home page*/
//                 res.render('todo', {doneTask: data});
//             };
//         });
//         /*end of getting data Done from Db and passing it to the view*/
//     });
        
    
//     /*setting up post request to add an item*/
//     doneRouter.post('/done',urlencodedParser, (req, res) => {
//         /*appending the clients request to the data array(used during data masking)*/
//         // data.push(req.body);
//         /*End of appending the clients request to the data array*/

//         /*getting data from view and adding it to database but also making sure that its not an empty string*/
//         if (req.body !== " ") {
            
//             var doneTask = Done(req.body).save((err, data) => {
//                 if (err) {
//                     console.log('error in marking task as done : ' + err);
//                     /*include flash message in future times*/
//                 } else {
//                     console.log('Task done');
//                     res.json(data);
//                 };
//             });
//         } 
//         /*trying to save item to database*/
//     });
//     /*End of getting data from view and adding it to database but also making sure that its not an empty string*/
//     /*End of creating add Item request for done Task*/


// };