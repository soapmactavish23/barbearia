var datatable = $('#datatable').DataTable( {
	"ajax": {
		"url": url + '/api.php',
		"deferRender": true,
		"dataSrc": function (json) { if (json.data) return json.data; else return false; },
		"type": "POST",
		"data": function (d) {
			d.classe = 'agenda';
			d.metodo = 'obterParaAtender';
			d.token = token;
		}
	}, 
	"columns": [
        { "data": "nome_corte", "visible": true },
        { "data": "status", "visible": true },
        { "data": "data", "className": "dt-body-right", "visible": true, "render": function(datetime) { return datetime_format(datetime,'d/m/y h:i')} }
	],
//	"order": [[2, 'desc']],
	"responsive": true,
	"language": {
		"url": "lib/datatables/Portuguese-Brasil.lang"
	}
});

$('#datatable tbody').on('click', 'tr', function () {
	data = datatable.row( this ).data();
	loadForm();
});

function loadForm() {
	$('.modal-content').load('partial/atender-form.html', function(response,status) {
		if ( status == 'success' ) $('.modal').modal('show');
	});
}