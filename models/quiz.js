var mongoose = require('mongoose');

var Quiz = mongoose.model('Quiz', {
	userSubmit: String,
	translation: String,
	correctness: String

})

module.exports = Quiz;