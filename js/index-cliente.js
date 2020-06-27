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
