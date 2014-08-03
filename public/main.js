$.fn.serializeObject=function(){"use strict";var a={},b=function(b,c){var d=a[c.name];"undefined"!=typeof d&&d!==null?$.isArray(d)?d.push(c.value):a[c.name]=[d,c.value]:a[c.name]=c.value};return $.each(this.serializeArray(),b),a};

var clientSideCount = 0;

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

		var targetWord = $('#target-word');
		var guess = $('#guess');

		$.post('/quizSubmit',
			{
				wordForTrans: targetWord.text(),
				guess:guess.val()
			},
			function(data){
				$('#evaluation').append(data.answer);
				targetWord.text(data.newword);
				guess.val('');	

				clientSideCount += 1;	

				if(clientSideCount === 3){

					//  trigger an event to grab the result and display it
					$.post('/getResult', function(result){

						$('#result-display').append('You\'ve answered ' + result.length + ' correctly');
						
						clientSideCount = 0;
					});
				}						
			}
		);


	});

})