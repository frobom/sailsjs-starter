/**
 * FolderController
 *
 * @description :: Server-side logic for managing Folders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	folder: function(req, res) {
		//req.session.projectId = req.param("projectId");
		//return res.view('folder');
		//return res.send(req.param('projectId')+" by "+req.param("userId")+" name is "+req.param("projectName"));
		req.session.projectId = req.param("projectId");
		var criteria = {projectId: req.param("projectId")};
		var getFolders;
		Folder.find(criteria).sort('id ASC').exec(function (err, fldrs){
			if (err) return res.serverError(err);
			getFolders = fldrs;
		});
		criteria = {userId: req.session.userId};
		Project.find(criteria).sort('id ASC').exec(function (err, pjts){
			if (err) return res.serverError(err);
			return res.view('project', {
				projects: pjts,
				folders: getFolders
			});
		});
	},
	create: function(req, res) {
		//return res.view('folder');
		//return res.send(req.param('projectId')+" FolderName "+req.param("name"));
		Folder.create({
			name: req.param('name'),
         	projectId: req.param("projectId")
        }).exec(function (err, folder) {
			if ( err ) {
				//return res.send('Error '+req.param('name')+" in "+req.param("projectId"));
				return res.view('error');
			}
			else {
				//return res.send('created '+req.param('name')+" by "+req.session.userId);
				//return res.view('projectList');
				req.session.projectId = req.param("projectId");
				var criteria = {projectId: req.param("projectId")};
				var getFolders;
				Folder.find(criteria).sort('id ASC').exec(function (err, fldrs){
					if (err) return res.serverError(err);
					getFolders = fldrs;
				});
				criteria = {userId: req.session.userId};
				Project.find(criteria).sort('id ASC').exec(function (err, pjts){
					if (err) return res.serverError(err);
					return res.view('project', {
						projects: pjts,
						folders: getFolders
					});
				});
			}
		});
	},
};

