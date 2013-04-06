
/*
 * GET Login page.
 */

exports.index = function(req, res){
  res.render('login', { title: 'Please login to your account' });
};
