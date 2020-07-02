//Histórico de cortes
var datatable = $('#datatable').DataTable( {
	"ajax": {
		"url": url_cliente + '/api/api.php',
		"deferRender": true,
		"dataSrc": function (json) { if (json.data) return json.data; else return false; },
		"type": "POST",
		"data": function (d) {
			d.classe = 'cliente';
			d.metodo = 'obterHistoricoCortes';
			d.token = token_cliente;
		}
	}, 
	"columns": [
        { "data": "nome", "visible": true },
        { "data": "preco", "visible": true },
        { "data": "data", "className": "dt-body-right", "visible": true, "render": function(datetime) { return datetime_format(datetime,'d/m/y h:i')} },
        { "data": "status", "visible": true },
	],
//	"order": [[2, 'desc']],
	"responsive": true,
	"language": {
		"url": "lib/datatables/Portuguese-Brasil.lang"
	}
});