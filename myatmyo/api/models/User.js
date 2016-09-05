/*
If you want to hash a password before saving in the database, you might use the beforeCreate lifecycle callback.
calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
*/
var bcrypt = require('bcryptjs');
module.exports = {
    attributes: {
        email: {
            type: 'email',
            required: true,
            unique: true
        },
        name: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            minLength: 6,
            required: true
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },
    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    }
};