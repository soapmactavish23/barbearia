// habilitar captura de imagem pela webcam
var video = document.querySelector('video');
var handleSuccess = function (stream) {
	video.srcObject = stream;
}
var handleError = function (error) {
	console.log(error);
}
navigator.mediaDevices.getUserMedia({video: true})
	.then(handleSuccess)
    .catch(handleError);
    
//Tirar a foto
$('#btn-capturar').click( function() {
	var snapshotCanvas = document.getElementById('snapshot');
	var context = snapshot.getContext('2d');
	// Draw the video frame to the canvas.
	context.drawImage(video, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
	// Base64 from image
	$('input[name="foto"]').val(snapshotCanvas.toDataURL('image/png'));
});

$('#btn-alterar-foto').click( function () {
	$('#div-foto').hide();
	$('#div-camera').show();
});

//Desliga a camera
$('.modal').on('hidden.bs.modal', function (e) {
	video.srcObject.getVideoTracks().forEach(track => track.stop());
});	

$('form').submit(function(){
	var formData = $(this).serializeArray();
	formData.push({name: 'classe', value: 'cliente'});
	formData.push({name: 'metodo', value: 'salvar_foto'});
	formData.push({name: 'token', value: token_cliente});
	$.ajax({
		type: 'POST',
		url: url_cliente+'/api/api.php',
		data: formData,
		success: function(result) {	
			if ( result.error ) {
				alert(result.error);
			} else {
				$('.modal-title').text('Cliente #' + result.idcliente);
				$('input[name="idcliene"]').val(result.idcliene);
				alert('Cliente ID '+result.idcliene+' gravado!');
				datatable.ajax.reload(null, false);
				$('.modal').modal('hide');
			}
		}
	});
	$('#foto').attr('src', $('input[name=foto]').val());
	$('#div-foto').show();
	$('#div-camera').hide();
	return false;
});