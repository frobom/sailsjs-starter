/**
 * FolderController
 *
 * @description :: Server-side logic for managing folders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
 	create: function(req, res) {
 		var data_from_client = req.params.all();
 		var projectName;
 		var criteria = {id: data_from_client.projectId};
 		if(req.isSocket && req.method === 'POST'){

 			Project.findOne(criteria).exec(function (err, project){
 				if (err) return res.serverError(err);
 				projectName = project.name;
 				console.log("this is project name "+projectName);


 				var filessystem = require('fs');
				var dir = process.cwd()+'\\'+projectName+'\\'+data_from_client.name; //error in projectName

				if (!filessystem.existsSync(dir)){
					filessystem.mkdirSync(dir);
					Folder.create({
						name: data_from_client.name,
						projectId: data_from_client.projectId
					}).exec(function(error,data_from_client){
						if(error){
							console.log(error);
						} else {
							console.log(data_from_client);
							Folder.publishCreate({id:data_from_client.id, name:data_from_client.name});
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
 			console.log( 'subscribed to ' + req.socket.id );
 		} 
 	},
 	all: function(req,res) {
 		var criteria = {projectId: req.param("projectId")};
 		console.log("folder/all "+req.param("projectId"));
 		Folder.find(criteria).sort('id ASC').exec(function (err, fldrs){
 			if (err) return res.serverError(err);
 			console.log("all folder "+fldrs );
 			res.send(fldrs);
 		});
 	},
 };


