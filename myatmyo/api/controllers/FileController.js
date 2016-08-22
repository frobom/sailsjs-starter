/**
 * FileController
 *
 * @description :: Server-side logic for managing Files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	file: function(req, res) {
		//req.session.projectId = req.param("projectId");
		//return res.view('folder');
		//return res.send(req.param('projectId')+" by "+req.param("userId")+" name is "+req.param("projectName"));
		req.session.folderId = req.param("folderId");
		req.session.folderId = req.param("folderId");
		var criteria = {projectId: req.session.projectId};
		var getFolders;
		Folder.find(criteria).sort('id ASC').exec(function (err, fldrs){
			if (err) return res.serverError(err);
			getFolders = fldrs;
		});
		criteria = {folderId: req.session.folderId};
		var getFiles;
		File.find(criteria).sort('id ASC').exec(function (err, fls){
			if (err) return res.serverError(err);
			getFiles = fls;
		});
		criteria = {userId: req.session.userId};
		Project.find(criteria).sort('id ASC').exec(function (err, pjts){
			if (err) return res.serverError(err);
			return res.view('project', {
				projects: pjts,
				folders: getFolders,
				files: getFiles
			});
		});
	},
	create: function(req, res) {
		//return res.view('folder');
		//return res.send(req.param('projectId')+" FolderName "+req.param("name"));
		File.create({
			name: req.param('name'),
			data: "dfdfg",
			folderId: req.param("folderId")
        }).exec(function (err, folder) {
			if ( err ) {
				//return res.send('Error '+req.param('name')+" in "+req.param("projectId"));
				return res.view('error');
			}
			else {
				//return res.send('created '+req.param('name')+" by "+req.session.userId);
				//return res.view('projectList');
				req.session.folderId = req.param("folderId");
				var criteria = {projectId: req.session.projectId};
				var getFolders;
				Folder.find(criteria).sort('id ASC').exec(function (err, fldrs){
					if (err) return res.serverError(err);
					getFolders = fldrs;
				});
				criteria = {folderId: req.session.folderId};
				var getFiles;
				File.find(criteria).sort('id ASC').exec(function (err, fls){
					if (err) return res.serverError(err);
					getFiles = fls;
				});
				criteria = {userId: req.session.userId};
				Project.find(criteria).sort('id ASC').exec(function (err, pjts){
					if (err) return res.serverError(err);
					return res.view('project', {
						projects: pjts,
						folders: getFolders,
						files: getFiles
					});
				});
			}
		});
	},
	open: function(req, res) {

		req.session.fileId = req.param("fileId");
		var criteria = {id: req.session.fileId};
		var getFileDatas;
		File.find(criteria).exec(function (err, data){
			if (err) return res.serverError(err);
			getFileDatas = data;
		});
		criteria = {projectId: req.session.projectId};
		var getFolders;
		Folder.find(criteria).sort('id ASC').exec(function (err, fldrs){
			if (err) return res.serverError(err);
			getFolders = fldrs;
		});
		criteria = {folderId: req.session.folderId};
		var getFiles;
		File.find(criteria).sort('id ASC').exec(function (err, fls){
			if (err) return res.serverError(err);
			getFiles = fls;
		});
		criteria = {userId: req.session.userId};
		Project.find(criteria).sort('id ASC').exec(function (err, pjts){
			if (err) return res.serverError(err);
			return res.view('project', {
				projects: pjts,
				folders: getFolders,
				files: getFiles,
				fileDatas: getFileDatas
			});
		});
	},
};

