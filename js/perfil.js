$('#nome-perfil').text(user_cliente.nome);
if(user_cliente.foto){
    $('#img-perfil').attr('src', user_cliente.foto);
}
var dados_usuario;
$('#btn-editar').click(function(){
    carregarModal('cadastro-cliente');
    $.ajax({
        url: url_cliente + '/api/api.php',
        type: 'POST',
        data: {classe: 'cliente', metodo: 'obterClienteLogado', token: token_cliente},
        success: function(result){
            $.each( result.data, function(i, field) {
                dados_usuario = field;
            });
        }
    });
});

//Carregar as tabs
$('#geral').load('partial/geral-perfil-tab.html');

$('#c').load('partial/cortes-perfil-tab.html');

$('#recurso').load('partial/acao-recurso.html');

$('#indicador').load('partial/produtividade-acao-indicador.html');

