/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

	createProject: function(req, res, next){
		var createdProject = [{projectName: req.param('projectName'), userId : req.session.userId}];
		Project.create(createdProject).exec(function(error, projects) {
            if (error) return next(error);
             return res.redirect('/showProjects');
        });
	},

	showProjects: function(req, res){
		var userId = [{userId: req.session.userId}];
		Project.find(userId).exec(function(error, projects) {
																																																																																																																																																													  		if (error) {
    		return res.serverError(error);
  		}
  		req.session.projects = projects;
  		//sails.log('Wow, there are %d users named Finn.  Check it out:', projects.length, projects);
  		//return res.json(projects);
  		//sails.log('projects ', projects.length);
  		return res.view('project', {createdProjects : projects} );
		});
		
	}
}