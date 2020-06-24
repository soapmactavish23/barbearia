var datatable = $('#datatable').DataTable( {
	"ajax": {
		"url": url + '/api.php',
		"deferRender": true,
		"dataSrc": function (json) { if (json.data) return json.data; else return false; },
		"type": "POST",
		"data": function (d) {
			d.classe = 'agenda';
			d.metodo = 'obterParaPagar';
			d.token = token;
		}
	}, 
	"columns": [
        { "data": "idagenda", "visible": true },
        { "data": "barbeiro", "visible": true },
        { "data": "corte", "visible": true },
        { "data": null, "className": "details-control", "ordenable": false, "defaultContent": '' }
	],
//	"order": [[2, 'desc']],
	"responsive": true,
	"language": {
		"url": "lib/datatables/Portuguese-Brasil.lang"
	}
}); 

$('#datatable tbody').on('click', 'td.details-control', function () {
    data = datatable.row( this ).data();
    if(confirm("A conta já foi Paga?")){
        $.ajax({
            url: url + '/api.php',
            type: 'POST',
            data:{
                classe: "agenda",
                metodo: "pagar",
                token: token,
                idagenda: data.idagenda
            },
            success: function(result){
                alert("Atendimento #"+result.idagenda+" foi pago com sucesso");
                datatable.ajax.reload(null, false);
            }
        });
    }
});