var mongoose = require('mongoose');

var userSchema = nmongoose.Schema({
	name: String,
	id: String,
	quiz: {
		id: String,
		wordList: [
			{
				word: String,
				from: String,
				to: String,
				correct: Boolean
			}

			//need 9 more of the above object 
		]

	},
	quizStat: {
		quizTaken: Number,
		quizPassed: Number,
		quizFailed: Number,
		percentQuizPassed: Number
	},
	wordStat: {
		word: Number,
		wordCorr: Number,
		wordIncorr: Number,
		percentWordCorr: Number
	},
	bestTenWords: [
		{ 
			vocabulary: String, 
			from: String
		}
		//need 9 more of the word objects
	],
	worstTenWords: [
		{ 
			vocabulary: String, 
			from: String
		}
		//need 9 more of the word objects
	]

});

var User = mongoose.model('User', userSchema);

