$('.modal-dialog').addClass('modal-sm');
$('.cpf').mask('999.999.999-99');
$('.contato').mask('(99) 99999-9999');
$('input[name="idcliente"]').hide();
if(dados_usuario){
    $('#btn-voltar-cadastro').hide();
    $('input[name="idcliente"]').val(dados_usuario.idcliente);
    $('input[name="nome"]').val(dados_usuario.nome);
    $('input[name="cpf"]').val(dados_usuario.cpf);
    $('input[name="email"]').val(dados_usuario.email);
    $('input[name="contato"]').val(dados_usuario.contato);
    $('#form-senha').hide();
}

$('form').submit(function(){
    if($('input[name="password"]').val() == $('input[name="password2"]').val()){
        var formData = $(this).serializeArray();
        $.ajax({
            url: url_cliente + '/api/cadastrar_cliente.php',
            type: 'post',
            data: formData,
            success: function(result){
                console.log(result);
                if (result) {
                    if (result.error) {
                        alert(result.error);
                    } else {
                        alert(result.msg);
                        $('.modal').modal('hide');
                        // carregarModal('login-cliente');
                    }
                }
            }
        });
    }else{
        alert("As senhas não são iguais");
    }
    return false;
});
