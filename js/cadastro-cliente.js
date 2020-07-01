$('.modal-dialog').addClass('modal-sm');
$('.cpf').mask('999.999.999-99');
$('.contato').mask('(99) 99999-9999');

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
                        alert("Usuário Cadastrado com Sucesso");
                        carregarModal('login-cliente');
                    }
                }
            }
        });

    }else{
        alert("As senhas não são iguais");
    }
    return false;
});
