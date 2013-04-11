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
		}	
		else{
			Account.findOne({email:newData.email}, function(e, o) {
				if (o){
					callback('email-taken');
				}	
				else{
					// hash the password before storing
					saltAndHash(newData.pass, function(hash){
						newData.pass = hash;
					
	                    new Account({
	                        name    : newData.name,
	                        email   : newData.email,
	                        user    : newData.user,
	                        pass    : newData.pass,
	                        date	: moment().format('YYYY-MM-DD hh:mm:ss a')
	                    }).	save(callback);	
					});
				}
			});
		}
	});
}

exports.login = function(user, pass, callback){
	Account.findOne({user:user}, function(e, o){
		if(o == null){
			callback('user-not-found');
		}
		else{
			validatePassword(pass, o.pass, function(err, res){
				if(res){
					callback(null, o);
				}
				else{
					callback('invalid-password');
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

var validatePassword = function(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}
