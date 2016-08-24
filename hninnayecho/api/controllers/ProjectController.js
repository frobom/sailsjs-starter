/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

	createproject: function(req, res, next){
		var createdproject = [{projectname: req.param('projectname'), userId : req.session.userId}];
		Project.create(createdproject).exec(function(error, projects) {
            if (error) return next(error);
             return res.redirect('/showprojects');
        });
	},

	showprojects: function(req, res){
		var userId = [{userId: req.session.userId}];
		Project.find(userId).exec(function(error, projects) {
  		if (error) {
    		return res.serverError(error);
  		}
  		//sails.log('Wow, there are %d users named Finn.  Check it out:', projects.length, projects);
  		//return res.json(projects);
  		return res.view('project', {createdprojects : projects});
		});
		
	}
}