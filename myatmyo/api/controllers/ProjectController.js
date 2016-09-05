/**
* ProjectController
*
* @description :: Server-side logic for managing projects
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

var memberArray;

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

	},
	setting: function(req, res) {

		return res.view('projectSetting');
	},
	getAllMember: function(req, res) {

		var projectData = req.params.all();
		var criteria = {id: projectData.projectId};
		Project.findOne(criteria).exec(function (err, project){
				if (err) return res.serverError(err);
				res.send(project.members);
			});

	},
	addMember: function(req, res) {

		var projectData = req.params.all();
		var openingProjectMembers;

		if(req.isSocket && req.method === 'POST'){

			User.findOne({name:projectData.memberName}).exec(function (err, user){
					if (err) return res.serverError(err);

					if(user) {
						Project.findOne({id: projectData.projectId}).exec(function(error, project){
							if(error) {
								console.log(error);
							}
							else {
								openingProjectMembers = project.members;
								if(openingProjectMembers.indexOf(projectData.memberName) == -1 && user.id != req.session.userId) {
									openingProjectMembers.push(projectData.memberName);
									Project.update(
										{id: projectData.projectId},{members:openingProjectMembers}).exec(function(error,updatedProject){
											if(error){
												console.log(error);
											} else {
												Project.publishCreate({id:projectData.projectId, name:projectData.memberName});
											}
										}); 
								}
							}
						});
					}
					else{
						console.log("Error in adding member.");
						Project.publishCreate({id:projectData.projectId});
					}
				});
		}
		else if(req.isSocket){

			Project.watch(req.socket);
			console.log( 'subscribed to ' + req.socket.id );
		} 

	},
	removeMember: function(req,res) {

		// remove member and retrun publishcreate //req.session.openingProjectMembers

		var projectData = req.params.all();
		var openingProjectMembers;


		Project.findOne({id: projectData.projectId}).exec(function(error, project){
				if(error) {
					console.log(error);
				}
				else {
					openingProjectMembers = project.members;
					if(openingProjectMembers.indexOf(projectData.memberName) != -1) {
						openingProjectMembers.splice(openingProjectMembers.indexOf(projectData.memberName) , 1);
						Project.update(
							{id: projectData.projectId},{members:openingProjectMembers}).exec(function(error,updatedProject){
								if(error){
									console.log(error);
								} else {
									Project.publishCreate({id:projectData.projectId, removeName:projectData.memberName});
								}
							}); 
					}
				}
			});
	},
	/*memberProjects: function(req, res) {

		var userName;
		var criteria = {userId: req.session.userId};

		User.findOne(criteria).exec(function (err, user){
			if(err) console.log("error "+err);
			console.log(user.id+" / "+ user.name+ " / "+user.email);
			userName = user.name;

			var criteria = {members: {'contains' : userName}};

			Project.find(criteria).sort('id ASC').exec(function (err, pjts){
				if (err) return res.serverError(err);

				console.log("all project "+pjts.length );
				console.log("project name "+req.session.userName);
				//res.send(pjts);
				});
		});
	}*/
};

