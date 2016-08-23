/**
 * FolderController
 *
 * @description :: Server-side logic for managing folders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	createfolder: function(req, res, next){
		
		var createdfolder = [{foldername: req.param('foldername'), projectId : req.param('projectId')}];
		Folder.create(createdfolder).exec(function(error, folders) {
            if (error) return next(error);

            return res.redirect('/showprojects');
        });
	},

	showfolders: function(req, res){
		var projectId = [{projectId: req.param('projectId')}];
		sails.log('Hello ', projectId);
		Folder.find(projectId).exec(function(error, folders) {
  		if (error) {
    		return res.serverError(error);
  		}
  		
  		//return res.json(projects);
  		return res.view('project', {createdfolders : folders});
		});
		
	}
}

