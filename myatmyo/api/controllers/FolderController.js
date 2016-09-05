/**
 * FolderController
 *
 * @description :: Server-side logic for managing folders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

 	create: function(req, res) {

 		var newFolderData = req.params.all();
 		var projectName;
 		var criteria = {id: newFolderData.projectId};

 		if(req.isSocket && req.method === 'POST'){

 			Project.findOne(criteria).exec(function (err, project){

 				if (err) return res.serverError(err);

 				projectName = project.name;

 				var filessystem = require('fs');
				var dir = process.cwd()+'\\'+projectName+'\\'+newFolderData.name; //error in projectName

				if (!filessystem.existsSync(dir)){

					filessystem.mkdirSync(dir);

					Folder.create({
							name: newFolderData.name,
							projectId: newFolderData.projectId
						}).exec(function(error,newFolderData){
							if(error){
								console.log(error);
							} else {
								console.log(newFolderData);
								Folder.publishCreate({id:newFolderData.id, name:newFolderData.name});
							}
						}); 
				}
				else {

					console.log("Directory already exist");
				}


			});
 		}
 		else if(req.isSocket){

 			Folder.watch(req.socket);
 		} 
 	},

 	all: function(req,res) {

 		var criteria = {projectId: req.param("projectId")};

 		Folder.find(criteria).sort('id ASC').exec(function (err, fldrs){
	 			if (err) return res.serverError(err);
	 			res.send(fldrs);
	 		});
 	},
 	
 	folders: function(req,res) {
		return res.view('folder');
	}
 };


