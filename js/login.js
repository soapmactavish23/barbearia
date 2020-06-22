$('form').submit(function() {
	var formData = $(this).serializeArray();
	$.ajax({
		type: 'POST',
		url: url+'/autentica.php',
		data: formData,
		success: function(result) {	
			if (result) {
				if (result.error) {
					alert(result.error);
				} else {
					sessionStorage.setItem('token', result.token);
					window.location.reload(true);									
				}
			} else {
				// Nenhum resultado
				$('input').val(null);
				alert('USUÁRIO e SENHA não encontrados');
			}
		}
	});	
	return false;
});

$(".modal").on('hide.bs.modal', function () {
	window.location.reload(true);
});