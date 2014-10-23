$(document).ready(function(){
	$('#submitButton').click(onSubmitButtonClick);

	function onSubmitButtonClick(e) {
		var form = {
			'toZip': $('#toZip').val(),
			'weight': $('#weight').val(),
			'orderprice': $('#orderprice').val()
		}

		$('#submitButton').prop('disabled', true);

		$.ajax({
			type: 'POST',
			url: '/rates',
			data: JSON.stringify(form),
			contentType: 'application/json',
			success: function(response){
				console.log('success submitting rates: ' + JSON.stringify(response));
  				$('#results').html(response);
			},
			error: function(response){
				console.log('error submitting rates: ' + JSON.stringify(response));
  				$('#results').text('Unable to reach server. Please try again later');
			},
			complete: function(response, status) {
				$('#submitButton').prop('disabled', false);
			}
		});
	}

	function onSuccessfulSubmitResults(data, status) {
		console.log(data);
	}
});