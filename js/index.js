var url = window.location.origin + '/api';

// Verifica se existe o token na sessionStorage
if ( sessionStorage.getItem('token') && sessionStorage.getItem('token') !== "undefined" ) {

	// Token existe na sessionStorage	
	var token = sessionStorage.getItem('token');
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jwt = JSON.parse(window.atob(base64));
	var user = JSON.parse(jwt.data);
	var permissions = user.permissao.split(',');
	
	var menu = $.ajax({
		url: 'json/menu.json', 
		success: function( menu ) {
			var liMenu = '';
			$.each(menu.items, function(i, item) {
				if (item.subitems) {
					var liSubMenu = '';
					$.each(item.subitems, function(i, subitem) {
						if ( permissions.indexOf( subitem.id ) > -1 ) {
							liSubMenu += '<li id="'+subitem.id+'"><a class="dropdown-item" href="#'+subitem.id+'">'+subitem.label+'</a></li>';
						}
					});
					if (liSubMenu) liMenu += '<li class="nav-item dropdown hvr-grow"><a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+item.label+'</a><ul class="dropdown-menu">'+liSubMenu+'</ul></li>';
				} else {
					if ( permissions.indexOf( item.id ) > -1 ) {
						liMenu += '<li class="nav-item" id="'+item.id+'"><a class="nav-link" href="#'+item.id+'">'+item.label+'</a></li>';
					}
				}
			});

			$('title').html(menu.title);
			// $('.navbar-brand').html(menu.title);
			$('#menu').html(liMenu);
			$('#user').html('<li class="nav-item dropdown hvr-grow"><a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Olá '+ user.nome +'</a><ul class="dropdown-menu"><li id="mudasenha"><a class="dropdown-item" href="#mudasenha">Mudar senha</a></li><li id="out"><a class="dropdown-item" href="#out">Sair</a></li></ul></li>');
			
			return menu;

		}
	}); 
	
	var loop;
	$('.navbar-nav').on('click', 'li', function() {
		$('.navbar-nav li').removeClass("active");
		$(this).addClass("active");
		userCaseId = $(this).attr('id');
		if ( userCaseId == 'out' ) {
			sessionStorage.removeItem('token');
			location.replace( "index.html" );
			return true;
		}
		if (typeof userCaseId !== 'undefined' ) {
			if ( user.mudasenha==true ) userCaseId = 'mudasenha';
			$('main').load('partial/'+userCaseId+'.html');
			clearInterval(loop);
		}
		$('.navbar-collapse').collapse('hide');		
	});
	
	$('.modal').on('hidden.bs.modal', function (e) {
		$('.modal-dialog').removeClass('modal-lg');
	})	

	$.fn.dataTable.ext.errMode = function ( settings, helpPage, message ) { 
		var error = message.split(" - ", 2);
		console.log ( error[1] );
		if ( error[1] == 'Token expirado') {
			sessionStorage.removeItem('token');
			location.reload(true);			
		}
	}

	if(permissions.indexOf( "matriz-atividade" ) > -1 ){
		userCaseId = 'matriz-atividade';
		if ( user.mudasenha==true ) userCaseId = 'mudasenha';
		$('main').load('partial/'+userCaseId+'.html');
	}

	//Dashboard
	$('.starter').load("partial/dashboard.html");

} else {

	// Token não existe na sessionStorage
	$('nav').hide()
	$('main').hide();
	$('title').text('Barbearia - Acesso restrito');
	$('.modal-dialog').addClass('modal-sm');
	$('.modal-content').load('partial/login.html');
	$('.modal').modal('show');
	
}