var datatable = $('#datatable').DataTable( {
	"ajax": {
		"url": url + '/api.php',
		"deferRender": true,
		"dataSrc": function (json) { if (json.data) return json.data; else return false; },
		"type": "POST",
		"data": function (d) {
			d.classe = 'agenda';
			d.metodo = 'obterTodosConsulta'; 
			d.token = token;
		}
	}, 
	"columns": [
		{ "data": null, "className": "details-control", "ordenable": false, "defaultContent": '' },
        { "data": "idagenda", "visible": true },
        { "data": "status", "visible": true }
	],
//	"order": [[2, 'desc']],
	"responsive": true,
	"language": {
		"url": "lib/datatables/Portuguese-Brasil.lang"
	}
}); 

$('#datatable tbody').on('click', 'td.details-control', function () {
	var tr = $(this).closest('tr');
	var row = datatable.row( tr );

	if ( row.child.isShown() ) {
		// This row is already open - close it
		row.child.hide();
		tr.removeClass('shown');
	}
	else {
		// Open this row
		row.child( format(row.data()) ).show();
		tr.addClass('shown');
	}
});

function format(d) {
    var cliente = d.cliente;
	var data = datetime_format(d.dt_update,'d/m/y h:i');
	var foto_cliente = d.foto_cliente;
	var foto_barbeiro = d.foto;
	if(!cliente){
		if(!foto_barbeiro) foto_barbeiro = "img/padrao.jpg";
		return	'<div class="row"><div class="col-sm-4"><img src="'+foto_barbeiro+'" class="img-fluid img-thumbnail"></div><div class="col-sm-8"><div><h3>Barbeiro: '+ d.barbeiro +'</h3></div><div>Corte: <b>'+ d.corte +'</b></div><div>Preço: <b>'+d.preco+'</b></div><div>Data: <b>'+ data +'</b></div>';
	}else{
		if(!foto_barbeiro) foto_barbeiro = "img/padrao.jpg";
		if(!foto_cliente) foto_cliente = "img/padrao.jpg";
		return	'<div class="row"><div class="col-sm-4"><img src="'+foto_barbeiro+'" class="img-fluid img-thumbnail"></div><div class="col-sm-8"><div><h3>Barbeiro: '+ d.barbeiro +'<h3></div><div>Corte: <b>'+ d.corte +'</b></div><div>Preço: <b>'+d.preco+'</b></div><div>Data: <b>'+ data +'</b></div></div><hr><div class="row"><div class="col-sm-4"><img src="'+foto_cliente+'" class="img-fluid img-thumbnail"></div><div class="col-sm-8"><div><h3>Cliente: '+ cliente +'</h3></div><div>Contato: <b>'+ d.contato +'</b></div><div>CPF: <b>'+d.cpf+'</b></div><div>Data: <b>'+ data +'</b></div>';
	}
}