
/*
 * GET users listing.
 */

exports.list = function(req, res){
	//res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
  	res.render('facebooktest', { title: 'Share or die!' });
};