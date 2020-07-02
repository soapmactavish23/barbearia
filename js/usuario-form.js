//Aplicando mascaras
$('.cpf').mask('999.999.999-99');
$('.phone_with_ddd').mask('(99) 99999-9999');

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

// Load Form
$('.modal-title').text('Novo usuário');
if ( data ) {
	$('.modal-title').text(data.nome);
	$('input[name="idusuario"]').val(data.idusuario);
	$('input[name="nome"]').val(data.nome);
	$('input[name="rg"]').val(data.rg);
	$('input[name="cpf"]').val(data.cpf);
	$('input[name="email"]').val(data.email);
	$('input[name="dt_nascimento"]').val(data.dt_nascimento);
	$('input[name="contato"]').val(data.contato);
	$('#foto').attr('src', data.foto).show();
	$('#div-camera').hide();
	$('#div-foto-envio').hide();
}else{
	$('#div-camera').show();
	$('#div-foto-envio').show();
	$('#div-foto').hide();
}

//Tirar a foto
$('#btn-capturar').click( function() {
	var snapshotCanvas = document.getElementById('snapshot');
	var context = snapshot.getContext('2d');
	// Draw the video frame to the canvas.
	context.drawImage(video, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
	// Base64 from image
	$('input[name="foto"]').val(snapshotCanvas.toDataURL('image/png'));
});

//Enviar Foto
$('#img-enviada').change( function() {
});

// Select Picker para funcao
var select_funcao = $('select[name="funcao"]');
$.ajax({
	type: 'post',
	url: url + '/api.php',
	data: {classe: 'usuario', metodo: 'obterTodasAsFuncoes', token: token},
	success: function(result){
		select_funcao.append( $('<option>', {text: '-- Nova Função --'}) );
		for(var i = 0; i < result.data.length; i++){
			var optgroup = "<option value='"+result.data[i].funcao+"'>" + result.data[i].funcao + "</option>";
			select_funcao.append(optgroup);
		}
		if ( data ) select_funcao.val(data.funcao.split(','));
		else select_funcao.val(result.data[0].funcao);
		select_funcao.selectpicker();
	}
});

//Modificar a função para input
$('#funcao').change( function() {
	if ($(this).val() == '-- Nova Função --') {
		$('#div-funcao').html("<input class='form-control' type='text' id='funcao' name='funcao' placeholder='Digite a função de trabalho do usuário' required>");
		$('#funcao').focus();		
	}
});

// Select Picker para permissao
var select_2 = $('select[name="permissao[]"]');
// Carrega options
$.each(menu.responseJSON.items, function(index, element) {
	if (element.subitems) {
		var optgroup = "<optgroup label='"+element.label+"'>";
		$.each(element.subitems, function(subIndex, subElement) {
			optgroup += "<option value='"+subElement.id+"'>"+subElement.label+"</option>";
		});
		optgroup += "</optgroup>";
		select_2.append(optgroup);
	} else {
		select_2.append( $('<option>', {value: element.id, text: element.label}) );
	}
});			
if ( data ) select_2.val(data.permissao.split(','));
select_2.selectpicker();

//Ativado
if ( data ) {
	if (data.ativado=='S') $('#ativado').prop('checked',true);
	// oculta o botao excluir
	$('#btn-excluir').hide();
} else {
	// oculta o botao excluir e renova senha
	$('#btn-excluir').hide();
	$('#btn-renovar-senha').hide();
}			

$('form').submit(function(){
	var formData = $(this).serializeArray();
	formData.push({name: 'classe', value: 'usuario'});
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
				$('.modal-title').text('Usuário #' + result.idusuario);
				$('input[name="idusuario"]').val(result.idusuario);
				$('#btn-renovar-senha').show();
				//$('#btn-excluir').show();
				alert('Usuário ID '+result.idusuario+' gravado!');
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

$('#btn-excluir').click(function(){
	if ( confirm('Tem certeza que deseja excluir este registro?') ) {
		var formData=[];
		formData.push({name: 'classe', value: 'usuario'});
		formData.push({name: 'metodo', value: 'excluir'});
		formData.push({name: 'token', value: token});
		formData.push({name: 'idusuario', value: $('input[name="idusuario"]').val()});
		$.ajax({
			type: 'POST',
			url: url+'/api.php',
			data: formData,
			success: function(result) {	
				if ( result.error ) {
					alert(result.error);
				} else {
					$('input[name="idusuario"]').val(null);
					$('#btn-renovar-senha').hide();
					$('#btn-excluir').hide();

					alert('ID '+result.idusuario+' excluído!');
					datatable.ajax.reload(null, false);
					console.log(result);
				}
			}
		});	
	}
});

$('#btn-alterar-foto').click( function () {
	$('#div-foto').hide();
	$('#div-camera').show();
});

//Desliga a camera
$('.modal').on('hidden.bs.modal', function (e) {
	video.srcObject.getVideoTracks().forEach(track => track.stop());
});	

$('#btn-renovar-senha').click(function(){
	var formData=[];
	formData.push({name: 'classe', value: 'usuario'});
	formData.push({name: 'metodo', value: 'renovarSenha'});
	formData.push({name: 'token', value: token});
	formData.push({name: 'idusuario', value: $('input[name="idusuario"]').val()});
	formData.push({name: 'email', value: $('input[name="email"]').val()});
	$.ajax({
		type: 'POST',
		url: url+'/api.php',
		data: formData,
		success: function(result) {	
			if ( result.error ) {
				alert(result.error);
			} else {
				alert('Senha do usuário ID '+result.idusuario+' renovada!');
				datatable.ajax.reload(null, false);
			}
		}
	});	
});