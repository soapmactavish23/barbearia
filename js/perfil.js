$('#nome-perfil').text(user_cliente.nome);
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
