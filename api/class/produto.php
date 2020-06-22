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

}

?>