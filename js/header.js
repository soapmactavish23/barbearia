$('#btn-entrar').click(function(){
    carregarModal('login');
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