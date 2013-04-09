require('./database_connection');

module.exports = function(passport, LocalStrategy){
	passport.serializeUser(function(user, done) {
    	done(null, user.id);
	});
	
	passport.deserializeUser(function(id, done) {
    	db.findUserById(id, function(err, user){
       		done(err, user);
    	});
	});
	
	passport.use(new LocalStrategy(
	    function(username, password, done) {
	        process.nextTick(function () {
	            db.findUser(username, function(err, user) {
	                //conditions....
	            });
	        });
	    }
	));
	
	function ensureAuthenticated(req, res, next) {
	    if (req.isAuthenticated()) { return next(); }
	    res.redirect('/')
	}
};