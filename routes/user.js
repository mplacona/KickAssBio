var AM = require('../modules/account_manager');


/*
 * GET users signup.
 */
exports.signup = function(req, res){
	res.render('signup', { title: 'Please give me some details' });
};


/*
 * POST users signup.
 */
exports.create = function(req, res){
	AM.addNewAccount({
		name	:	req.param('name'),
		email	:	req.param('email'),
		user	:	req.param('user'),
		pass	:	req.param('pass')
	}, 	
	function(e){
		if(e){
			res.send(e, 400);
		}
		else{
			res.send('ok', 200);
		}
	});
};