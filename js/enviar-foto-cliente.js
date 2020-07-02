$('.modal-title').text('Enviar uma foto');
if (user_cliente.foto) {
	$('#foto').attr('src', data.foto).show();
	$('#foto_1').hide();
	$('#div-camera').hide();
	$('#div-foto-envio').hide();
} else {
	$('#div-camera').show();
	$('#div-foto-envio').show();
	$('#div-foto').hide();
	$('#foto_1').hide();
}

var drawImageBase64InCanvas = function (canvasId, imageBase64) {
	var canvas = document.getElementById(canvasId);
	var context = canvas.getContext('2d');
	var image = new Image();
	image.src = imageBase64;
	image.onload = function () {
		context.drawImage(image, 0, 0, canvas.width, canvas.height);
	};
}

var photoCurrent = 1;

$('input[type=file][max-size]').change(function () {
	var inputFile = $(this);
	var maxSize = parseInt(inputFile.attr('max-size'), 10);
	var files = inputFile.get(0).files;
	for (file of files) {
		if (file.size > maxSize) {
			alert('Arquivo muito grande (' + Math.round(file.size / 1000) + ' KB)!\nReduza a resolução.');
			return false;
		}
		if (file.type.includes('image') == false) {
			alert('Arquivo incompatível!');
			return false;
		}
	}

	if (photoCurrent == 1) {
		var canvas = 'snapshot_1';
		var inputData = $('input[name=foto_1]');
		var photo = $('#foto_1');
	}

	if (FileReader && file) {
		var fr = new FileReader();
		fr.onload = function (e) {
			drawImageBase64InCanvas(canvas, e.target.result);
			inputData.val(e.target.result);
			photo.show();
			photoCurrent++;
			if ($('#foto_1').is(":visible")) $('#camera').hide();
		}
		fr.readAsDataURL(file);
	}
});

$('#btn-alterar-foto-1').click(function () {
	$('#foto_1').hide();
	$('#camera').show();
	photoCurrent = 1;
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
                alert(result.success);
                $('.modal').modal('hide');
            }
        }
    });
    $('#foto').attr('src', $('input[name=foto]').val());
    $('#div-foto').show();
    $('#div-camera').hide();
    return false;
});