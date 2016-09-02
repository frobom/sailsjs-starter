/*/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var jsonFile = require('jsonfile');

 module.exports = {

 	create: function(req, res) {

 		var newDtfileData = req.params.all();
 		var folderName;
 		var projectName;

 		if(req.isSocket && req.method === 'POST'){

 			var criteria = {id: newDtfileData.folderId};
 			Folder.findOne(criteria).exec(function (err, folder){

 				if (err) {return res.serverError(err);}

 				folderName = folder.name;
 				criteria = {id: folder.projectId};

 				Project.findOne(criteria).exec(function (err, project){

 					if (err) return res.serverError(err);

 					projectName = project.name;

 					var filePath = process.cwd()+'\\'+projectName+'\\'+folderName+'\\'+newDtfileData.name+'.json';

 					var obj = {
		 						dt:{
		 							conditions :["condition1"],
		 							actions: ["action1"],
		 							rules: [
			 							{
			 								conditions : [],
			 								actions :[]
			 							}
		 							]
	 							}
 							}

	 				jsonFile.writeFile(filePath, obj, function(err){

	 					if(err) console.error(err);


	 					else{

	 						Dtfile.create({
		 							name: newDtfileData.name,
		 							folderId: newDtfileData.folderId,
		 							projectId: folder.projectId,
		 							path: filePath
		 						}).exec(function(error,newDtfileData){
		 							if(error) {
		 								console.log("this is file create error "+error);
		 							}
		 							else {
		 								console.log(newDtfileData);
		 								Dtfile.publishCreate({id:newDtfileData.id, name:newDtfileData.name, path:newDtfileData.path});
		 							}
		 						}); 
	 					}

	 				});

 				});
 			});

		}
		else if(req.isSocket){

			Dtfile.watch(req.socket);
			console.log( 'subscribed to ' + req.socket.id );

		} 
	},

	all: function(req,res) {

		var criteria = {projectId: req.param("projectId")};

		Dtfile.find(criteria).sort('id ASC').exec(function (err, files){

			if (err) return res.serverError(err);

			res.send(files);

			});
	},

	getDtData: function(req,res) {

		jsonFile.readFile(req.param("path"), function(err, obj) {

			if(err) return res.serverError(err);

			res.send(obj);

		});
	}
};

