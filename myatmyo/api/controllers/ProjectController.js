/**
* ProjectController
*
* @description :: Server-side logic for managing projects
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/
//return res.view('/');
//req.param.all()
module.exports = {
	create: function(req, res) {
		var data_from_client = req.params.all();

		if(req.isSocket && req.method === 'POST'){

			var filessystem = require('fs');
			var dir = process.cwd()+'\\'+data_from_client.name;

			if (!filessystem.existsSync(dir)) {
				filessystem.mkdirSync(dir);

				Project.create({
					name: data_from_client.name,
					userId: req.session.userId
				}).exec(function(error,data_from_client){
					if(error){
						console.log(error);
					} else {
						console.log("created data "+data_from_client);
						Project.publishCreate({id:data_from_client.id, name:data_from_client.name});
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
};

