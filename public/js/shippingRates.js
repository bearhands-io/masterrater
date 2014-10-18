$(document).ready(function(){
	$('#submitButton').click(onSubmitButtonClick);

	function onSubmitButtonClick(e) {


  		var posting = $.post('/rates', { /* form */ } );
  		posting.done(function(data) {
  			console.log(data);
  			$('#results').html(data);
  		});
	}

	function onSuccessfulSubmitResults(data, status) {
		console.log(data);
	}
});