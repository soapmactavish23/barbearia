var datatable = $('#datatable').DataTable( {
	"ajax": {
		"url": url + '/api.php',
		"deferRender": true,
		"dataSrc": function (json) { if (json.data) return json.data; else return false; },
		"type": "POST",
		"data": function (d) {
			d.classe = 'produto';
			d.metodo = 'obterTodos';
			d.token = token;
		}
	}, 
	"columns": [
		{ "data": null, "className": "details-control", "ordenable": false, "defaultContent": '' },
        { "data": "nome", "visible": true },
        { "data": "preco", "visible": true }
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
	return	'<div class="row"><div class="col-sm-4"><img src="'+d.foto+'" class="img-fluid img-thumbnail"></div><div class="col-sm-8"><div>Nome: <b>'+ d.nome +'</b></div><div>Preço: <b>'+d.preco+'</b></div><div>Descrição: <b>'+d.descricao+'</b></div>';
}