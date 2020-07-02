//Histórico de barbeiros
$.ajax({
    url: url_cliente + '/api/api.php',
    type: 'post',
    data: {classe: 'cliente', metodo: 'obterHistoricoBarbeiros', token: token_cliente},
    success: function(result){
        $.each( result.data, function(i, field) {
            $('#list-group-barbeiros').append('<a href="#" class="list-group-item list-group-item-action flex-column align-items-start hvr-grow"><div class="row"><div class="col-sm-2"><img src="'+field.foto+'" class="rounded-circle img-fluid" width="80" height="80"></div><div class="col-sm-10"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">'+field.nome+'</h5><small>Total de Cortes: '+field.total+'</small></div><p align="left">'+field.contato+'</p></div></div></a>');
        });
    }
});