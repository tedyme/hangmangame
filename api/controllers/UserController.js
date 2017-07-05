/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function(req, res) {
		if (req.body.username && req.body.password) {
			var foundUser = User.findOne({username: req.body.username, password: req.body.password}).exec(function (err, data) {
		    	if (err) {
		    		res.json({error: 'Error executing query: ' + err});
		    	} else if (data && data.id) {
		    		req.session.uid = data.id;   // returned from a database
		    		res.json(data);

		    	} else {
		    		res.json({error: 'User not found!'});
		    	}
		    });	
		} else {
			res.json({error: 'Could not parse the provided input, ' + e.toString()})
		}
	    

  }


};



