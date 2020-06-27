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
		WHERE (status = 'EM ABERTO' OR status = 'EM ATENDIMENTO') AND a.idusuario = ".$_user->idusuario;
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

	public function obterParaPagar(){
		$sql = "SELECT idagenda, u.nome as barbeiro, concat(c.nome, ' R$', preco) as corte
		FROM corte c
		INNER JOIN agenda a
		ON a.idcorte = c.idcorte
		INNER JOIN usuario u
		ON a.idusuario = u.idusuario
		WHERE status = 'FINALIZADO'";
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

	public function obterTodosConsulta(){
		$sql = "SELECT idagenda, status, u.nome as barbeiro, u.foto, c.nome as cliente, ct.nome as corte, ct.preco, a.dt_update 
		FROM agenda a
		INNER JOIN usuario u
		ON a.idusuario = u.idusuario
		LEFT JOIN cliente c
		ON a.idcliente = c.idcliente
		INNER JOIN corte ct
		ON a.idcorte = ct.idcorte";
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

	public function verificarEmAtendimento(){
		global $_user;
		$sql = "SELECT idagenda FROM agenda WHERE idusuario = ".$_user->idusuario." AND status = 'EM ATENDIMENTO'";
		if($rs = parent::fetch_all($sql)){
			return true;
		}else{
			return false;
		}
	}

	public function iniciarAtendimento(){
		$this->idagenda = @ $_REQUEST['idagenda'];
		if( $this->idagenda ){
			$this->status = "EM ATENDIMENTO";
			$this->dt_update = date('Y-m-d H:i:s');
			$this->update();
			return array( 'idagenda' => $this->idagenda );
		}
	}

	public function finalizarAtendimento(){
		$this->idagenda = @ $_REQUEST['idagenda'];
		if( $this->idagenda ){
			$this->status = "FINALIZADO";
			$this->dt_update = date('Y-m-d H:i:s');
			$this->update();
			return array( 'idagenda' => $this->idagenda );
		}
	}

	public function distribuirAtendimento(){
		$this->idagenda = @ $_REQUEST['idagenda'];
		$this->idusuario = @ $_REQUEST['barbeiro'];
		$this->dt_update = date('Y-m-d H:i:s');
		$this->update();
		return array( 'idagenda' => $this->idagenda, 'idusuario' => $this->idusuario );
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
			
			// global $_user;
			// $this->saveLog('alterou agenda ID '.$this->idagenda, $_user->idusuario);
		} else {
			$this->idagenda = $this->insert();
			
			// global $_user;
			// $this->saveLog('inserir agenda ID '.$this->idagenda, $_user->idusuario);
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

	public function pagar(){
		$this->idagenda = @ $_REQUEST['idagenda'];
		$this->status = "PAGO";
		$this->dt_update = date('Y-m-d H:i:s');
		$this->update();
		global $_user;
		$this->saveLog('pagou agenda ID '.$_REQUEST['idagenda'], $_user->idusuario);
		return array ( 'idagenda' => $this->idagenda );
	}

	public function contarStatus(){
		$sql = "SELECT COUNT(*) as total,
		(SELECT COUNT(*) from agenda WHERE status = 'EM ABERTO') as aberto,
		(SELECT COUNT(*) from agenda WHERE status = 'PAGO') as pago,
		(SELECT COUNT(*) from agenda WHERE status = 'EM ATENDIMENTO') as atendimento,
		(SELECT COUNT(*) from agenda WHERE status = 'FINALIZADO') as finalizado 
		from agenda";
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

	public function contarCortesBarbeiros(){
		$sql = "SELECT nome, COUNT(*) as cortes FROM agenda a
		INNER JOIN usuario u
		ON a.idusuario = u.idusuario
		WHERE funcao = 'BARBEIRO'
		group by nome";
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

	public function contarCortes(){
		$sql = "SELECT nome, COUNT(*) as pedidos FROM AGENDA a
		INNER JOIN corte c
		ON a.idcorte = c.idcorte
		group by nome";
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

}
?>