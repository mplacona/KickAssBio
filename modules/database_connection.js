mongoose	= require('mongoose');

dbPort 		= 27017;
dbHost 		= 'localhost';
dbName 		= 'KickAssBio';

db = mongoose.createConnection(dbHost, dbName);
db.on('error', console.error.bind(console, 'connection error:'));