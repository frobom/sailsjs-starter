/**
* ProjectController
*
* @description :: Server-side logic for managing projects
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/
//return res.view('/');
//req.param.all()
module.exports = {
	project: function(req, res) {
		return res.view('project');
	},
	create: function(req, res) {
		var name = req.param("name");
		Project.create({
			name: req.param('name'),
         	userId: req.session.userId
        }).exec(function (err, project) {
			if ( err ) {
				return res.send('Error '+req.param('name')+" by "+req.session.userId);
			}
			else {
				return res.send('created '+req.param('name')+" by "+req.session.userId);
			}
		});
	},
};

