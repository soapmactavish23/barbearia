var drawImageBase64InCanvas = function ( canvasId, imageBase64 ) {
	var canvas = document.getElementById( canvasId );
	var context = canvas.getContext('2d');
	var image = new Image();
	image.src = imageBase64;
	image.onload = function() {
		context.drawImage( image, 0, 0, canvas.width, canvas.height);
	};					
}

var photoCurrent = 1;

$('input[type=file][max-size]').change( function() {
	var inputFile = $(this);
	var maxSize = parseInt(inputFile.attr('max-size'),10);
	var files = inputFile.get(0).files;
	for (file of files) {
		if ( file.size > maxSize ) {
			alert ( 'Arquivo muito grande ('+Math.round(file.size/1000)+' KB)!\nReduza a resolução.');
			return false;
		}
		if (file.type.includes('image')==false) {
			alert ( 'Arquivo incompatível!');
			return false;
		}
	}

	if ( photoCurrent == 1 ) {
		var canvas = 'snapshot_1';
		var inputData = $('input[name=foto_1]');
		var photo = $('#foto_1');
	}

	if ( FileReader && file ) {
		var fr = new FileReader();
        fr.onload = function (e) {
			drawImageBase64InCanvas( canvas, e.target.result);
			inputData.val(e.target.result);
			photo.show();
			photoCurrent ++;
			if ( $('#foto_1').is(":visible") ) $('#camera').hide();
        }
		fr.readAsDataURL(file);
	}
});

$('#btn-alterar-foto-1').click( function() {
	$('#foto_1').hide();
	$('#camera').show();
	photoCurrent = 1;
});

// Load Form
$('.modal-title').text('Novo Produto');
if ( data ) {
	$('.modal-title').text('Produto #'+data.idproduto);
	$('input[name="idproduto"]').val(data.idproduto);
	$('input[name="nome"]').val(data.nome);
	$('input[name="preco"]').val(data.preco);
	$('textarea[name="descricao"]').val(data.descricao);
	$('#foto').attr('src', data.foto).show();
	$('#div-camera').hide(); 
	$('#div-foto-envio').hide();
	$('#foto_1').hide();
}else{
	$('#div-camera').show();
	$('#div-foto-envio').show();
	$('#div-foto').hide();
	$('#foto_1').hide();
	$('#btn-excluir').hide();
}

$('form').submit(function(){
	var formData = $(this).serializeArray();
	formData.push({name: 'classe', value: 'produto'});
	formData.push({name: 'metodo', value: 'salvar'});
	formData.push({name: 'token', value: token});
	$.ajax({
		type: 'POST',
		url: url+'/api.php',
		data: formData,
		success: function(result) {	
			if ( result.error ) {
				alert(result.error);
			} else {
				$('.modal-title').text('Produto #' + result.idproduto);
				$('input[name="idproduto"]').val(result.idproduto);
				$('#btn-excluir').show();
				alert('Produto ID '+result.idproduto+' gravado!');
				datatable.ajax.reload(null, false);
				$('.modal').modal('hide');
			}
		}
	});
	return false;
});