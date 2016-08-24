/**
 * FolderController
 *
 * @description :: Server-side logic for managing folders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	createFolder: function(req, res, next){
		
		var createdfolder = [{foldername: req.param('foldername'), projectId : req.param('projectId')}];
		Folder.create(createdfolder).exec(function(error, folders) {
            if (error) return next(error);

            return res.redirect('/showprojects');
        });
	},

	showFolders: function(req, res){
		var projectId = [{projectId: req.param('projectId')}];
		var projects = req.session.projects;
		sails.log('Hello ', projectId);
		Folder.find(projectId).exec(function(error, folders) {
  		if (error) {
    		return res.serverError(error);
  		}
  		//sails.log('foldername' , folders)
  		//return res.json(folders);
  		return res.view('project', {createdfolders : folders, createdprojects : projects});
		});
		
	}
}

