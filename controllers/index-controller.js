var BeGlobal=require('../models/api.js');
var list=require('../models/word-list.js');

var count=0;

var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	translateWord: function(word, cb){
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
	    	cb(results);
  		});

  		

	},
	translate: function(req, res){
		var word=req.body.word;

		indexController.translateWord(word, function(data){
			res.send(data);

		});

		// res.send(indexController.translateWord(word), function(data){
		// 	console.log(data)
		// })
	
		//initialize the BeGlobal API
		// var beglobal = new BeGlobal.BeglobalAPI({
		//   api_token: '5KCVfjJg0ykZn4FKpGfXAQ%3D%3D'
		// });


		// beglobal.translations.translate(
	 //  	{text: word, from: 'eng', to: 'fra'},
	 //  	function(err, results) {
		//     if (err) {
		//       return console.log(err);
		//     }
	 //    	res.send(results);
  // 		});
		
	},
	// render the quize page
	quizPage: function(req, res){
		
		res.render('quiz',{
			list:list[0]
		});
	},
	quizSubmit: function(req,res){
		count++;
		count=count%10;
		indexController.translateWord(req.body.wordForTrans, function(result){
			var answer = result.translation.toLowerCase();
			var guess = req.body.guess.toLowerCase();

			if( guess === answer ){
				res.send({
					answer:'correct',
					newword:list[count]
				})
			}
			else{
				res.send({
					answer:'incorrect',
					newword:list[count]
				});
			}





		})	


		
		// res.send('text')
		//compare guess to translated sent list item
	
	},
	checkAnswer: function(req, res){
		// var 
		
	}


};

module.exports = indexController;