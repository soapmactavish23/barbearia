if(data){
    $('.modal-title').text("Protocolo de Agendamento #"+data.idagenda);
    $('#data').text(function() { return datetime_format(data.data,'d/m/y h:i')});
    $('#nome_cliente').text(data.nome_cliente);
    $('#nome_corte').text(data.nome_corte);
    $('#foto').attr("src",data.foto);
    $('#div-barbeiro').hide();
    $('#btn-cancelar').hide();
    $('#btn-gravar').hide();
}else{
    $('.modal').hide();
}

// Select Picker para barbeiros
var select_barbeiro = $('select[name="barbeiro"]');
$.ajax({
	type: 'post',
	url: url + '/api.php',
	data: {classe: 'usuario', metodo: 'obterTodosBarbeirosDisponiveis', token: token},
	success: function(result){
		for(var i = 0; i < result.data.length; i++){
			var optgroup = "<option value='"+result.data[i].idusuario+"'>" + result.data[i].nome + "</option>";
			select_barbeiro.append(optgroup);
		}
		select_barbeiro.selectpicker();
	}
});

//Verificar se o usuario ja esta em atendimento
$.ajax({
    url: url + '/api.php',
    type: "POST",
    data:{classe: "agenda", metodo: "verificarEmAtendimento", token: token},
    success: function(estaEmAtendimento){
        if(estaEmAtendimento == true){
            $("#btn-iniciar").hide();
        }else{
            $("#btn-iniciar").show();
        }
    }
});

if(data.status == "EM ABERTO"){
    $('#btn-finalizar').hide();
}else if(data.status == "EM ATENDIMENTO"){
    $('#btn-finalizar').show();
    $('#btn-iniciar').hide();
    $('#btn-distribuir').hide();
    $('#div-barbeiro').hide();
}

//Iniciar Atendimento
$('#btn-iniciar').click(function(){
    $.ajax({
        url: url + '/api.php',
        type: "POST",
        data: {
            classe: "agenda",
            metodo: "iniciarAtendimento", 
            idagenda: data.idagenda,
            token:token
        },
        success: function(result){
            alert("Atendimento N°"+result.idagenda+" foi iniciado");
            $('#btn-iniciar').hide();
            $('#btn-distribuir').hide();
            $('#btn-finalizar').show();
            datatable.ajax.reload(null, false);
        }
    });
});

//Finalizar Atendimento
$('#btn-finalizar').click(function(){
    $.ajax({
        url: url + '/api.php',
        type: "POST",
        data: {
            classe: "agenda",
            metodo: "finalizarAtendimento", 
            idagenda: data.idagenda,
            token:token
        },
        success: function(result){
            alert("Atendimento N°"+result.idagenda+" foi finalizado");
            $('.modal').modal('hide');
            datatable.ajax.reload(null, false);
        }
    });
});

//Cancelar Distribuição
$('#btn-cancelar').click(function(){
    $('#div-barbeiro').hide();
    $('#btn-distribuir').show();
    $('#btn-iniciar').show();
    $('#btn-cancelar').hide();
    $('#btn-gravar').hide();
});

//Distribuir Atendimento
$('#btn-distribuir').click(function(){
    $('#div-barbeiro').show();
    $('#btn-distribuir').hide();
    $('#btn-iniciar').hide();
    $('#btn-cancelar').show();
    $('#btn-gravar').show();
});

$('form').submit(function(){
    var formData = $(this).serializeArray();
    formData.push({ name: 'classe', value: 'agenda' });
    formData.push({ name: 'metodo', value: 'distribuirAtendimento' });
    formData.push({ name: 'token', value: token });
    formData.push({ name: 'idagenda', value: data.idaganda });
    console.log(formData);
    $.ajax({
        url: url + '/api.php',
        type: "POST",
        data: formData,
        success: function(result){
            alert("Agendamento N°"+result.idagenda+" foi distrbuido com sucesso para usuário #"+result.idusuario);
            $('modal').modal("hide");
            datatable.ajax.reload(null, false);
        }
    });
    return false;
});