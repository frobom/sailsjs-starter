/**
* AuthController
*
* @description :: Server-side logic for managing auths
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

var passport = require('passport');

module.exports = {

	_config: {
		actions: false,
		shortcuts: false,
		rest: false
	},

	login: function(req, res) {

		passport.authenticate('local', function(err, user, info) {
			if ((err) || (!user)) {
				return res.send({
					message: info.message,
					user: user
				});
			}
			req.logIn(user, function(err) {
			
				if (err) return res.send(err);
				req.session.userId = user.id;
				return res.redirect('/projects');
			});

		})(req, res);
	},

	logout: function(req, res) {
		req.logout();
		res.redirect('/');
	}
};
