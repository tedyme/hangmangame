/**
 * ScoreController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
printScores: function (req, res) {
	if (req.session.uid) {
		Score.find({player: req.session.uid}).exec(function (err, data) {
			res.view('stats.ejs', {data:data, err:err});
		});
	} else {
		res.view('stats.ejs');
	}
	
}


};



