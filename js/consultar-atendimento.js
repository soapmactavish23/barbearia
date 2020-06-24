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
    if(!cliente) cliente = "CLIENTE NÃO CADASTRADO";
    var data = datetime_format(d.dt_update,'d/m/y h:i');
	return	'<div class="row"><div class="col-sm-4"><img src="'+d.foto+'" class="img-fluid img-thumbnail"></div><div class="col-sm-8"><div>Barbeiro: <b>'+ d.barbeiro +'</b></div><div>Corte: <b>'+ d.corte +'</b></div><div>Preço: <b>'+d.preco+'</b></div><div>Cliente: <b>'+ cliente +'</b></div><div>Data: <b>'+ data +'</b></div>';
}