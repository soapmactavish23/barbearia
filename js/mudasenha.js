$('form').submit(function(){
	if ( $('#password').val() != $('#password2').val() ) {
		alert('Nova senha inválida');
		return false;
	}

	var data = $(this).serializeArray();
	data.push({name: 'classe', value: 'cliente'});
	data.push({name: 'metodo', value: 'mudarSenha'});
	data.push({name: 'token', value: token});

	$.post( url + '/api.php', data, function (result) {
		if ( result.error ) {
			alert(result.error);
		} else {
			alert(result.success);
			$('input').val(null);
		}
	});	
	return false;
});