var coresBootstrap = [
    '#d9534f',
    '#f0ad4e',
    '#0275d8',
    '#5cb85c',
    '#5bc0de',
    '#292b2c'
];
//Situação de cortes atualizados
$.ajax({
    url: url + '/api.php',
    type: 'post',
    data: {classe: 'agenda', metodo: 'contarStatus', token: token},
    success: function(result){
        console.log(result);
        var aberto = parseInt(result.data[0].total);
        var atendimento = parseInt(result.data[1].total);
        var finalizado = parseInt(result.data[2].total);
        var pago = parseInt(result.data[3].total);
        var resultadoTotal = aberto + atendimento + finalizado + pago;
        $('#aberto').text(aberto);
        $('#atendimento').text(atendimento);
        $('#finalizado').text(finalizado);
        $('#pago').text(pago);
        $('#total').text(resultadoTotal);
    }
});

//Grafico para cortes de barbeiros
var chartBarbeiros = new Chart( $('#painel-barbeiros'), {
    type: 'horizontalBar',
    data: {
        labels: [],
        datasets: [{
            label: 'Cortes',
            data: [],
            backgroundColor: coresBootstrap,
            borderColor: 'rgba(0, 0, 0, 0.0)',
            borderWidth: 2,
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            fontSize: 16,
            fontFamily: 'Arial',
            text: 'Barbeiros que mais atendem'
        },
        elements: {
            rectangle: {
                borderWidth: 2,
            }
        },
        legend: {
            display: false,
            position: 'right',
        },
        scales: {
            xAxes: [{
                display: true,
                ticks: { 
                    beginAtZero: true
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'Período'
                }
            }],
        }
    }
});
$.ajax({
    url: url + '/api.php',
    type: 'post',
    data: {classe: 'agenda', metodo: 'contarCortesBarbeiros', token: token},
    success: function(result){
        chartBarbeiros.data.labels = [];
        chartBarbeiros.data.datasets[0].data = [];
        $.each( result.data, function(i, field) {
            chartBarbeiros.data.labels.push(field.nome);
            chartBarbeiros.data.datasets[0].data.push(parseInt(field.cortes));
        });
        chartBarbeiros.update();     
    }
});

//Grafico para cortes de barbeiros
var chartCortes = new Chart( $('#painel-cortes'), {
    type: 'pie',
    data: {
        labels: [],
        datasets: [{
            label: 'Pedidos',
            data: [],
            backgroundColor: coresBootstrap,
            borderColor: 'rgba(0, 0, 0, 0.0)',
            borderWidth: 2,
        }]
    },
    options: {
		responsive: true,
		title: {
			display: true,
			fontSize: 16,
			fontFamily: 'Arial',
			text: 'Cortes Mais Pedidos'
		},
		legend: { position: 'right' },
	}
});
$.ajax({
    url: url + '/api.php',
    type: 'post',
    data: {classe: 'agenda', metodo: 'contarCortes', token: token},
    success: function(result){
        chartCortes.data.labels = [];
        chartCortes.data.datasets[0].data = [];
        $.each( result.data, function(i, field) {
            chartCortes.data.labels.push("Pedidos de " + field.nome);
            chartCortes.data.datasets[0].data.push(parseInt(field.pedidos));
        });
        chartCortes.update();     
    }
});