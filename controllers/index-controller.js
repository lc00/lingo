var BeGlobal=require('../models/api.js');
var list=require('../models/word-list.js');
var mongoose = require('mongoose');
var Quiz = require('../models/data.js');

mongoose.connect('mongodb://localhost/funQuiz');

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
	},
	// render the quize page
	quizPage: function(req, res){
		
		res.render('quiz',{
			list:list[0]
		});
	},
	quizSubmit: function(req,res){
		count++;
		indexController.translateWord(req.body.wordForTrans, function(result){
			var answer = result.translation.toLowerCase();
			var guess = req.body.guess.toLowerCase();

			var quiz = new Quiz({
				userSubmit: guess,
				translation: answer
			})
			if(count >= 3){
				Quiz.find({},function(err,result){
					// res.render('index')

					//window.location.href="url";

				})
			}

			else if( guess === answer ){

				quiz.correctness = "correct";

				res.send({
					answer:'correct',
					newword:list[count],
					count:count
				})
			}
			else{
				quiz.correctness = "incorrect";

				res.send({
					answer:'incorrect',
					newword:list[count],
					count:count
				});
			}


			quiz.save(function(error, result){
				if(error){
					console.log(error)
				}
				else{
					console.log(result)
				}

			})



		})	


		
		// res.send('text')
		//compare guess to translated sent list item
	
	},
	checkAnswer: function(req, res){
		// var 
		
	}


};

module.exports = indexController;