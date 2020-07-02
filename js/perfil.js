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
var carregou_c = false;
var carregou_b = false;
var carregou_p = false;
$('#c-tab').click(function(){
    if(!carregou_c){
        $('#c').load('partial/cortes-perfil-tab.html');
        carregou_b = true;
    }
});

$('#b-tab').click(function(){
    if(!carregou_b){
        $('#b').load('partial/barbeiro-perfil.html');
        carregou_b = true;
    }
});
