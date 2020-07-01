var url_cliente = window.location.origin;
//Carregar a Navbar
$.ajax({
	url: url_cliente + '/partial/header.html',
	success: function(data){
        $('header').html(data);
	}
});

//Carregar a main
$.ajax({
	url: url_cliente + '/partial/home.html',
	success: function(data){
		$('#main-cliente').html(data);
	}
});

//Carregar o Footer
$.ajax({
	url: url_cliente + '/partial/footer.html',
	success: function(data){
		$('footer').html(data);
	}
});

// Verifica se existe o token na sessionStorage
if ( sessionStorage.getItem('token_cliente') && sessionStorage.getItem('token_cliente') !== "undefined" ) {

	// Token existe na sessionStorage	
	var token_cliente = sessionStorage.getItem('token_cliente');
	var base64Url = token_cliente.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jwt = JSON.parse(window.atob(base64));
	var user_cliente = JSON.parse(jwt.data);

	

}else{

}