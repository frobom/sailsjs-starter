/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	showprojects: function(req, res) {
		
		Project.find(req.session.userId).exec(function (error, projects) {
      		 if (err) {
    			return res.serverError(err);
  				}
  		sails.log('CreatedProject:  ', projects.length, projects);
  		return res.json(projects);
    	});
		}
	},

	createproject: function (req, res, next) {
	 	var createdproject = [{projectname: req.param('projectname') ,  userId : req.session.userId}];
	    Project.create(createdproject).done(function (err, project) {
	        if ( err ) {
	            return next(err);
	        }
	        else {
	            return res.redirect('/project');
	        }
	    });
	}

};

