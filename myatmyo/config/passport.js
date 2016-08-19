var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcryptjs');

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findOne({ id: id } , function (err, user) {
		done(err, user);
	});
});

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
},
function(email, password, done) {
	var criteria = { or: [{email: email}, {name: email}] };
	User.findOne(criteria, function (err, user) {
		if (err) { return done(err); }
		if (!user) {
			return done(null, false, { message: 'Incorrect email.' });
		}

		bcrypt.compare(password, user.password, function (err, res) {
			if (!res)
				return done(null, false, {
					message: 'Invalid Password'
				});
			var returnUser = {
				email: user.email,
				password: user.password,
				createdAt: user.createdAt,
				id: user.id
			};
			return done(null, returnUser, {
				message: 'Logged In Successfully'
			});
		});
	});
}
));