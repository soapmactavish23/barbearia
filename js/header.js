if(token_cliente){

    $('#btn-entrar').hide();
    $('#btn-sair').show();
    $('#btn-usuario').show();
    $('#nome-usuario').text(user_cliente.nome);

}else{
    $('#btn-sair').hide();
    $('#btn-usuario').hide();
    $('#btn-entrar').show();
}

$('#btn-entrar').click(function(){
    carregarModal('login');
});

$('#btn-sair').click(function(){
    sessionStorage.removeItem('token_cliente');
    location.replace( "index.html" );
    return true;
});

function carregarModal(localizacao){
    $.ajax({
        url: url_cliente + '/partial/' + localizacao + '.html' ,
        success: function(data){
            $('.modal-content').html(data);
        }
    });
}
function carregaMain(localizacao){
    $.ajax({
        url: url_cliente + '/partial/' + localizacao + '.html' ,
        success: function(data){
            $('main').html(data);
        }
    });
}