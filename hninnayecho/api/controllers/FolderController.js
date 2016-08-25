/**
 * FolderController
 *
 * @description :: Server-side logic for managing folders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	createFolder: function(req, res, next){
		
		var createdFolder = [{folderName: req.param('folderName'), projectId : req.param('projectId')}];
		Folder.create(createdFolder).exec(function(error, folders) {
            if (error) return next(error);

            return res.redirect('/showProjects');
        });
	},

	showFolders: function(req, res){
		
		var projectId = [{projectId: req.param('projectId')}];
		var projects = req.session.projects;
		
		Folder.find(projectId).exec(function(error, folders) {
																																																																																																																																																													  		if (error) {
    		return res.serverError(error);
  		}
  		//return res.json(projects);
  		//sails.log('folders ', folders.length);
  		return res.view('project', {createdFolders : folders, createdProjects : projects});
		});
		
	}
}

