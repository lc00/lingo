$.fn.serializeObject=function(){"use strict";var a={},b=function(b,c){var d=a[c.name];"undefined"!=typeof d&&d!==null?$.isArray(d)?d.push(c.value):a[c.name]=[d,c.value]:a[c.name]=c.value};return $.each(this.serializeArray(),b),a};

$(function(){

	$('#translateForm').on('submit', function(e){
		var data=$('#translateForm').serializeObject()
		data.something='test'
		e.preventDefault();
		$.post('/translate', data, function(results){
			console.log(results)
			$('body').append('<p>' + results.translation + '</p>');

		})
		$('.inputField').val('');
	})
	
	$('#quizForm').on('submit', function(e){
		e.preventDefault();

		$('#evaluation').empty();
		var targetword=$('#target-word')
		var guess=$('#guess')
		$.post('/quizSubmit',
			{
				wordForTrans: targetword.text(),
				guess:guess.val()
			},
			function(data){
				$('#evaluation').append(data.answer)
				targetword.text(data.newword)
				guess.val('')

			}
		);
	});

})