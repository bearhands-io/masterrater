$(document).ready(function(){
	$('#submitButton').click(onSubmitButtonClick);

	function onSubmitButtonClick(e) {
		$.post('/rates', null, onSuccessfulSubmitResults, 'application/json');
	}

	function onSuccessfulSubmitResults(data, status) {
		console.log(data);
	}
});