/*/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var jsonFile = require('jsonfile');
 module.exports = {
 	create: function(req, res) {
 		var data_from_client = req.params.all();
 		var folderName;
 		var projectName;

 		if(req.isSocket && req.method === 'POST'){


 			var criteria = {id: data_from_client.folderId};
 			Folder.findOne(criteria).exec(function (err, folder){
 				if (err) return res.serverError(err);

 				folderName = folder.name;
 				criteria = {id: folder.projectId};
 				Project.findOne(criteria).exec(function (err, project){
 					if (err) return res.serverError(err);

 					projectName = project.name;

 					console.log("this is in file create "+data_from_client.name+" / "+data_from_client.folderId);

 					var filePath = process.cwd()+'\\'+projectName+'\\'+folderName+'\\'+data_from_client.name+'.json';

 					var obj ={
 						dt:{condition :["condition1"],
 						action: ["action1"]
 					}
 				}

 				jsonFile.writeFile(filePath, obj, function(err){
 					if(err) console.error(err);
 					else{

 						Dtfile.create({
 							name: data_from_client.name,
 							folderId: data_from_client.folderId,
 							projectId: folder.projectId,
 							path: filePath
 						}).exec(function(error,data_from_client){
 							if(error) {
 								console.log("this is file create error "+error);
 							}
 							else {
 								console.log(data_from_client);
 								Dtfile.publishCreate({id:data_from_client.id, name:data_from_client.name, path:data_from_client.path});
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
	console.log("DtfileController/all "+req.param("projectId"));

	var criteria = {projectId: req.param("projectId")};

	Dtfile.find(criteria).sort('id ASC').exec(function (err, files){

		if (err) return res.serverError(err);
		console.log("      files length "+files.length);
		res.send(files);

		});
},
getDtData: function(req,res) {

	console.log("path "+req.param("path"));


	jsonFile.readFile(req.param("path"), function(err, obj) {

		if(err) return res.serverError(err);
		console.log(obj);
		res.send(obj);
	});

	/*var criteria = {projectId: req.param("projectId")};

	Dtfile.find(criteria).sort('id ASC').exec(function (err, files){

		if (err) return res.serverError(err);
		console.log("      files length "+files.length);
		res.send(files);

		});*/
}
};

