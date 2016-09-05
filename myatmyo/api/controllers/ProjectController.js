/**
* ProjectController
*
* @description :: Server-side logic for managing projects
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

module.exports = {

	create: function(req, res) {

		var newProjectData = req.params.all();

		if(req.isSocket && req.method === 'POST'){

			var filessystem = require('fs');
			var dir = process.cwd()+'\\'+newProjectData.name;

			if (!filessystem.existsSync(dir)) {

				filessystem.mkdirSync(dir);

				Project.create({
						name: newProjectData.name,
						userId: req.session.userId
					}).exec(function(error,newProjectData){
						if(error){
							console.log(error);
						} else {
							console.log(newProjectData);
							Project.publishCreate({id:newProjectData.id, name:newProjectData.name});
						}
					}); 
			}
			else {
				console.log("Directory already exist");
			}

		}
		else if(req.isSocket){

			Project.watch(req.socket);
			console.log( 'subscribed to ' + req.socket.id );
		} 
	},
	all: function(req,res) {

		var criteria = {userId: req.session.userId};
		Project.find(criteria).sort('id ASC').exec(function (err, pjts){
				if (err) return res.serverError(err);
				console.log("all project "+pjts );
				res.send(pjts);
			});

	},
	projects: function(req,res) {

		return res.view('project');
		
	}
};

