<?php

class agenda extends database {

    public function obterTodos() {
		$sql = "SELECT * FROM agenda";
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

	public function obterParaAtender(){
		global $_user;
		$sql = "SELECT idagenda, u.idusuario, u.nome, c.idcorte, c.nome as nome_corte, cl.idcliente AS nome_cliente, cl.nome, a.data as data, c.foto, status FROM agenda a
		INNER JOIN usuario u 
		ON u.idusuario = a.idusuario
		INNER JOIN corte c
		ON c.idcorte = a.idcorte
		LEFT JOIN cliente cl
		ON cl.idcliente = a.idcliente
		WHERE status = 'EM ABERTO' AND u.idusuario = ".$_user->idusuario;
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
		$this->idagenda = @ $_REQUEST['idagenda'];
		$this->idcliente = addslashes(@ $_REQUEST['idcliente']);
		$this->idusuario = addslashes(@ $_REQUEST['barbeiro']);;
		$this->idcorte = addslashes(@ $_REQUEST['corte']);
		$this->data = addslashes(@ $_REQUEST['data']);
	
		if ( $this->idagenda ) {
			$this->dt_update = date('Y-m-d H:i:s');
			$this->update();
			
			global $_user;
			$this->saveLog('alterou agenda ID '.$this->idagenda, $_user->idusuario);
		} else {
			$this->idagenda = $this->insert();
			
			global $_user;
			$this->saveLog('inserir agenda ID '.$this->idagenda, $_user->idusuario);
		}
		
		return array ( 'idagenda' => $this->idagenda);
	}
    
    public function excluir() {
		if ( @ $_REQUEST['idagenda'] ) {
			$this->idagenda = $_REQUEST['idagenda'];
			$this->delete();
			global $_user;
			$this->saveLog('excluiu agenda ID '.$_REQUEST['idagenda'], $_user->idusuario);
			return array ( 'idagenda' => $this->idagenda );
		}
	}

}
?>