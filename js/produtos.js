obter();

$('#search').keyup(function(){
    $('#card-produtos').html("");
    obter($('#search').val());
});

function obter(pesquisa){
    $.ajax({
        url: url_cliente + '/api/api_cliente.php',
        type: "POST",
        data:{classe: "produto", metodo: "obterParaView", pesquisa: pesquisa},
        success: function(result){
            $.each( result.data, function(i, field) {
                $('#card-produtos').append('<div class="card col-sm-4 box-shadow color-primary-dark text-light" data-aos="zoom-out"><div class="card-header"><img class="card-img-top hvr-bounce-in" id="img-corte" alt="Thumbnail [100%x225]" src="'+field.foto+'" style="height: 225px; width: 100%; display: block;"><h4 id="txt-nome" align="center">'+field.nome+'</h4></div><div class="card-body"><p class="card-text" id="txt-descricao">'+field.descricao+'</p><div class="d-flex justify-content-between align-items-center"></div><div class="card-footer"><div class="row"><div class="col-sm-8"></div><div class="col-sm-4"><h3 class="hvr-pop text-right" ><small class="text-muted" id="txt-preco">R$'+field.preco+'</small></h3></div></div></div></div></div></div>');
            });
        }
    });
}

$('.btn-adicionar').click(function(){
    alert("Item Adicionado");
});