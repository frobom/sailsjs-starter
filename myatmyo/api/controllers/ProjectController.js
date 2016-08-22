/**
* ProjectController
*
* @description :: Server-side logic for managing projects
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/
//return res.view('/');
//req.param.all()
//folders: {}
module.exports = {
	project: function(req, res) {
		//return res.view('project');
		var criteria = {userId: req.session.userId};
		Project.find(criteria).sort('id ASC').exec(function (err, pjts){
					if (err) return res.serverError(err);
					return res.view('project', {
						projects: pjts
					});
				});

	},
	create: function(req, res) {
		var name = req.param("name");
		Project.create({
			name: req.param('name'),
         	userId: req.session.userId
        }).exec(function (err, project) {
			if ( err ) {
				//return res.send('Error '+req.param('name')+" by "+req.session.userId);
				return res.view('error');
			}
			else {
				//return res.send('created '+req.param('name')+" by "+req.session.userId);
				//return res.view('projectList');
				var criteria = {userId: req.session.userId};
				Project.find(criteria).sort('id ASC').exec(function (err, pjts){
					if (err) return res.serverError(err);
					return res.view('project', {
						projects: pjts,
					});
				});
			}
		});
	},
};

