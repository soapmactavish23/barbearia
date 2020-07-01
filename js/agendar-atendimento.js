if(sessionStorage.getItem('token')){
	$('#msg-erro').hide();
	// Select Picker para barbeiros
	var select_barbeiro = $('select[name="barbeiro"]');
	$.ajax({
		type: 'post',
		url: url + '/api.php',
		data: {classe: 'usuario', metodo: 'obterTodosBarbeiros', token: token},
		success: function(result){
			console.log(result);
			for(var i = 0; i < result.data.length; i++){
				var optgroup = "<option value='"+result.data[i].idusuario+"'>" + result.data[i].nome + "</option>";
				select_barbeiro.append(optgroup);
			}
			select_barbeiro.selectpicker();
		}
	});
	
	// Select Picker para cortes
	var select_corte = $('select[name="corte"]');
	$.ajax({
		type: 'post',
		url: url + '/api.php',
		data: {classe: 'corte', metodo: 'obterParaAgendar', token: token},
		success: function(result){
			console.log(result);
			for(var i = 0; i < result.data.length; i++){
				var optgroup = "<option value='"+result.data[i].idcorte+"'>" + result.data[i].nome + "</option>";
				select_corte.append(optgroup);
			}
			select_corte.selectpicker();
		}
	});
	
	$('form').submit(function(){
		var formData = $(this).serializeArray();
		formData.push({name: 'classe', value: 'agenda'});
		formData.push({name: 'metodo', value: 'salvar'});
		formData.push({name: 'token', value: token});
		$.ajax({
			type: 'POST',
			url: url + '/api.php',
			data: formData,
			success: function(result){
				if(result.error){
					alert(result);
				}else{
					//$('form').reset();
					alert('Agendamento ID'+result.idagenda+' gravado!');
				}
			}
		});
		return false;
	});
}

if(sessionStorage.getItem('token_cliente')){
	$('#msg-erro').hide();
	// Select Picker para barbeiros
	var select_barbeiro = $('select[name="barbeiro"]');
	$.ajax({
		type: 'post',
		url: url_cliente + '/api/api.php',
		data: {classe: 'usuario', metodo: 'obterTodosBarbeiros', token: token_cliente},
		success: function(result){
			console.log(result);
			for(var i = 0; i < result.data.length; i++){
				var optgroup = "<option value='"+result.data[i].idusuario+"'>" + result.data[i].nome + "</option>";
				select_barbeiro.append(optgroup);
			}
			select_barbeiro.selectpicker();
		}
	});
	
	// Select Picker para cortes
	var select_corte = $('select[name="corte"]');
	$.ajax({
		type: 'post',
		url: url_cliente + '/api/api.php',
		data: {classe: 'corte', metodo: 'obterParaAgendar', token: token_cliente},
		success: function(result){
			console.log(result);
			for(var i = 0; i < result.data.length; i++){
				var optgroup = "<option value='"+result.data[i].idcorte+"'>" + result.data[i].nome + "</option>";
				select_corte.append(optgroup);
			}
			select_corte.selectpicker();
		}
	});
	
	$('form').submit(function(){
		var formData = $(this).serializeArray();
		formData.push({name: 'classe', value: 'agenda'});
		formData.push({name: 'metodo', value: 'salvar'});
		formData.push({name: 'token', value: token_cliente});
		formData.push({name: "idcliente", value: user_cliente.idcliente});
		$.ajax({
			type: 'POST',
			url: url_cliente + '/api/api.php',
			data: formData,
			success: function(result){
				if(result.error){
					alert(result);
				}else{
					//$('form').reset();
					alert('Agendamento ID'+result.idagenda+' gravado!');
				}
			}
		});
		return false;
	});
}