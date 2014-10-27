$(document).ready(function(){
	$('#submitButton').click(onSubmitButtonClick);

	function onSubmitButtonClick(e) {
		var URL = '/rates?' + 
		          'toZip=' + $('#toZip').val() + '&' +
		          'weight=' + $('#weight').val() + '&' +
		          'orderprice=' + $('#orderprice').val()

		$.ajax({
			type: 'GET',
			url: URL,
			beforeSend: function() {
				$('#submitButton').prop('disabled', true);
  				$('#results').text('Please wait...');
			},
			success: function(response) {
  				$('#results').html(response);
			},
			error: function(response) {
				console.log('error getting rates: ' + JSON.stringify(response));
  				$('#results').text('Server exception encountered. Please try again later');
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