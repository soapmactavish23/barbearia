<?php

class usuario extends database {
	
	public function autenticar ($login, $password) {
		$login = addslashes($login);
		$password = addslashes($password);
		$sql = "SELECT idusuario, nome, permissao, if(md5(email)=senha,true,false) mudasenha
		FROM usuario
		WHERE binary email='$login' and binary senha='".md5($password)."' 
		LIMIT 1";
		if ( $rs = parent::fetch_all($sql) ) {
			$row = array_shift($rs);
			$this->saveLog('Entrou', $row['idusuario']);
			$rows['token'] = createJWT ($row);
			return $rows;
		}
	}
	
	public function obterTodos() {
		$sql = "SELECT * FROM usuario";

		if ( $rs = parent::fetch_all($sql) ) {
			foreach ( $rs as $row ) {
				$col = array();
				foreach ( $row as $k=>$v ) {
					$col[$k] = stripslashes($v);
				}
				$rows[] = $col;
			}
			return array( 'data' => $rows );
		}
	}
	
	public function obterTodasAsFuncoes(){
		$sql = "SELECT DISTINCT funcao FROM usuario WHERE ativado = 'S'";
		if ( $rs = parent::fetch_all($sql) ) {
			foreach ( $rs as $row ) {
				$col = array();
				foreach ( $row as $k=>$v ) {
					$col[$k] = stripslashes($v);
				}
				$rows[] = $col;
			}
			return array( 'data' => $rows );
		}

	}

	public function obterTodosAtivados(){
		$sql = "SELECT idusuario, nome
		FROM usuario
		WHERE ativado = 'S'";

		if ( $rs = parent::fetch_all($sql) ) {
			foreach ( $rs as $row ) {
				$col = array();
				foreach ( $row as $k=>$v ) {
					$col[$k] = stripslashes($v);
				}
				$rows[] = $col;
			}
			return array( 'data' => $rows );
		}
	}

	public function obterTodosBarbeiros(){
		$sql = "SELECT idusuario, nome FROM usuario WHERE permissao LIKE '%atender%'";
		if ( $rs = parent::fetch_all($sql) ) {
			foreach ( $rs as $row ) {
				$col = array();
				foreach ( $row as $k=>$v ) {
					$col[$k] = stripslashes($v);
				}
				$rows[] = $col;
			}
			return array( 'data' => $rows );
		}
	}

	public function salvar() {
		$this->idusuario = @ $_REQUEST['idusuario'];
		$this->nome = addslashes(@ $_REQUEST['nome']);
		$this->cpf = addslashes(@ $_REQUEST['cpf']);
		$this->email = addslashes(@ $_REQUEST['email']);
		$this->dt_nascimento = @ $_REQUEST['dt_nascimento'];
		$this->funcao = addslashes(@ $_REQUEST['funcao']);
		$this->permissao = implode(',', @ $_REQUEST['permissao']);
		$this->contato = addslashes(@ $_REQUEST['contato']);
		$this->foto = @ $_REQUEST['foto'];
		
		if ( @ $_REQUEST['ativado'] ) $this->ativado = 'S';
		else $this->ativado = 'N';
		
		if ( $this->idusuario ) {
			$this->dt_update = date('Y-m-d H:i:s');
			$this->update();
			
			global $_user;
			$this->saveLog('alterou usuario ID '.$this->idusuario, $_user->idusuario);
		} else {
			$this->senha = md5($this->email);
			$this->idusuario = $this->insert();
			
			global $_user;
			$this->saveLog('inserir usuario ID '.$this->idusuario, $_user->idusuario);
		}
		
		return array ( 'idusuario' => $this->idusuario);
	}

	public function excluir() {
		if ( @ $_REQUEST['idusuario'] ) {
			$this->idusuario = $_REQUEST['idusuario'];
			$this->delete();
			global $_user;
			$this->saveLog('excluiu usuario ID '.$_REQUEST['idusuario'], $_user->idusuario);
			return array ( 'idusuario' => $this->idusuario );
		}
	}

	public function renovarSenha() {
		if ( @ $_REQUEST['idusuario'] && @ $_REQUEST['email'] ) {
			$this->idusuario = $_REQUEST['idusuario'];
			$this->senha = md5($_REQUEST['email']);
			$this->update();
			global $_user;
			$this->saveLog('renovou senha do usuario ID '.$_REQUEST['idusuario'], $_user->idusuario);
			return array ('idusuario' => $this->idusuario );
		}
	}

	public function mudarSenha() {
		global $_user;
		$sql = "SELECT idusuario FROM usuario
		WHERE binary idusuario='".$_user->idusuario."' and binary senha='".md5($_REQUEST['senha'])."' 
		LIMIT 1";
		if ( $rs = parent::fetch_all($sql) ) {
			$vet = array_shift($rs);
			$this->idusuario = $vet['idusuario'];
			$this->senha = md5($_REQUEST['novasenha']);
			$this->update();
			$this->saveLog('mudou senha', $_user->idusuario);
			return array ('success' => 'Sua senha foi alterada com sucesso' );
		} else {
			return array ('error' => 'Senha atual inválida');
		}
	}
}
?>