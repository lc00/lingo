var BeGlobal=require('../models/api.js');
var list=require('../models/word-list.js');
var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	translate: function(req, res){

		var word=req.body.word;
		console.log(typeof word)
		//initialize the BeGlobal API
		var beglobal = new BeGlobal.BeglobalAPI({
		  api_token: '5KCVfjJg0ykZn4FKpGfXAQ%3D%3D'
		});


		beglobal.translations.translate(
	  	{text: word, from: 'eng', to: 'fra'},
	  	function(err, results) {
		    if (err) {
		      return console.log(err);
		    }
	    	res.send(results);
  		});
		
	},
	quiz: function(req, res){
		
		res.render('quiz',{
			list:list[0]
		});
	},
	quizSubmit: function(req,res){
		console.log(req.body)
		res.send('text')
	}

};

module.exports = indexController;