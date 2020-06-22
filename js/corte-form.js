// Load Form
$('.modal-title').text('Novo Corte');
if ( data ) {
	$('.modal-title').text('Produto #'+data.idusuario);
    $('input[name="idusuario"]').val(data.idusuario);
    $('input[name="nome"]').val(data.nome);
    $('input[name="preco"]').val(data.preco);
    $('input[name="descricao"]').val(data.descricao);
	$('#foto').attr('src', data.foto).show();
	$('#div-camera').hide();
	$('#div-foto-envio').hide();
}else{
	$('#div-camera').show();
	$('#div-foto-envio').show();
	$('#div-foto').hide();
	$('#foto_1').hide();
	$('#foto_2').hide();
	$('#lbl-img').hide();
}