var crypto 		= require('crypto');
var moment 		= require('moment');
var db          = require('mongoose');
var Account     = db.model('Account');

/* record insertion, update & deletion methods */

exports.addNewAccount = function(newData, callback)
{
	Account.findOne({user:newData.user}, function(e, o) {
		if (o){
			callback('username-taken');
		}	else{
			Account.findOne({email:newData.email}, function(e, o) {
				if (o){
					callback('email-taken');
				}	else{
					saltAndHash(newData.pass, function(hash){
						newData.pass = hash;
					// append date stamp when record was created //
						newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
						//Account.insert(newData, {safe: true}, callback);
                        new Account({
                            name    : newData.name,
                            email   : newData.email,
                            user    : newData.user,
                            pass    : newData.pass
                        }).save(function( err, todo, count ){
                            
                         });
                  });
				}
			});
		}
	});
}

/* private encryption & validation methods */

var generateSalt = function()
{
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback)
{
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
}
