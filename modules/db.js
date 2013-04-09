var db          = require('mongoose');
var dbHost      = 'localhost';
var dbName      = 'KickAssBio';
var Schema      = db.Schema;

/* establish the database connection */
var Account = new Schema({
      name: String
    , email: String
    , user: String
    , pass: String
    , date: Date
}); 

db.model('Account', Account);
db.connect('mongodb://localhost/KickAssBio');
