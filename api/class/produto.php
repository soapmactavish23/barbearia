<?php

class produto extends database {

    public function obterTodos() {
		$sql = "SELECT * FROM produto";

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

	public function obterParaView(){
		$sql = "SELECT idproduto, nome, foto, descricao, preco FROM produto";
		if($_REQUEST['pesquisa']) $sql .= " WHERE nome like '%".$_REQUEST["pesquisa"]."%' OR preco like '%".$_REQUEST["pesquisa"]."%'";
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

	public function obterParaCliente(){
		$sql = "SELECT idproduto, foto, nome, descricao FROM produto";
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
		$this->idproduto = @ $_REQUEST['idproduto'];
		$this->nome = addslashes(@ $_REQUEST['nome']);
		$this->foto = @ $_REQUEST['foto_1'];
		$this->preco = addslashes(@ $_REQUEST['preco']);
		$this->descricao = addslashes(@ $_REQUEST['descricao']);
	
		if ( $this->idproduto ) {
			$this->dt_update = date('Y-m-d H:i:s');
			$this->update();
			
			global $_user;
			$this->saveLog('alterou produto ID '.$this->idproduto, $_user->idusuario);
		} else {
			$this->idproduto = $this->insert();
			
			global $_user;
			$this->saveLog('inserir produto ID '.$this->idproduto, $_user->idusuario);
		}
		
		return array ( 'idproduto' => $this->idproduto);
	}
	public function excluir() {
		if ( @ $_REQUEST['idproduto'] ) {
			$this->idproduto = $_REQUEST['idproduto'];
			$this->delete();
			global $_user;
			$this->saveLog('excluiu produto ID '.$_REQUEST['idproduto'], $_user->idusuario);
			return array ( 'idproduto' => $this->idproduto );
		}
	}

}

?>