$('.modal-dialog').addClass('modal-sm');
$('form').submit(function() {
	var formData = $(this).serializeArray();
	$.ajax({
		type: 'POST',
		url: url_cliente+'/api/autentica_cliente.php',
		data: formData,
		success: function(result) {	
			if (result) {
				if (result.error) {
					alert(result.error);
				} else {
					sessionStorage.setItem('token_cliente', result.token_cliente);
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

// $(".modal").on('hide.bs.modal', function () {
// 	window.location.reload(true);
// });