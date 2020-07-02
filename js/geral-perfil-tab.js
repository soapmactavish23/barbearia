//Gráfico Geral
var coresBootstrap = [
    '#d9534f',
    '#f0ad4e',
    '#0275d8',
    '#5cb85c',
    '#5bc0de',
    '#292b2c'
];

//Grafico de barbeiros
var chartBarbeiros = new Chart( $('#painel-barbeiros-perfil'), {
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
            text: 'Barbeiros que me atenderam'
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
    url: url_cliente + '/api/api.php',
    type: "POST",
    data: {classe: "agenda", metodo: "contarBarbeirosCliente", token: token_cliente},
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

//Grafico de Cortes
var chartCortes = new Chart( $('#painel-cortes-perfil'), {
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
			text: 'Cortes Mais Feitos'
		},
		legend: { position: 'right' },
	}
});
$.ajax({
    url: url_cliente + '/api/api.php',
    type: 'post',
    data: {classe: 'agenda', metodo: 'contarCortesCliente', token: token_cliente},
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