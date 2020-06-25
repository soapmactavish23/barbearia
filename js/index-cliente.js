var url_cliente = window.location.origin + '/barbearia';
//Carregar a Navbar
$.ajax({
	url: url_cliente + '/partial/header.html',
	success: function(data){
        $('header').html(data);
	}
});