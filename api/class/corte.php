<?php

class corte extends database {

    public function obterTodos() {
		$sql = "SELECT * FROM corte";
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
		$sql = "SELECT idcorte, nome, foto, descricao, preco FROM corte";
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

	public function obterParaAgendar(){
		$sql = "SELECT idcorte, concat(nome,' R$',preco) AS nome FROM corte";
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
		$this->idcorte = @ $_REQUEST['idcorte'];
		$this->nome = addslashes(@ $_REQUEST['nome']);
		$this->foto = @ $_REQUEST['foto_1'];
		$this->preco = addslashes(@ $_REQUEST['preco']);
		$this->descricao = addslashes(@ $_REQUEST['descricao']);
	
		if ( $this->idcorte ) {
			$this->dt_update = date('Y-m-d H:i:s');
			$this->update();
			
			global $_user;
			$this->saveLog('alterou corte ID '.$this->idcorte, $_user->idusuario);
		} else {
			$this->idcorte = $this->insert();
			
			global $_user;
			$this->saveLog('inserir corte ID '.$this->idcorte, $_user->idusuario);
		}
		
		return array ( 'idcorte' => $this->idcorte);
	}
	public function excluir() {
		if ( @ $_REQUEST['idcorte'] ) {
			$this->idcorte = $_REQUEST['idcorte'];
			$this->delete();
			global $_user;
			$this->saveLog('excluiu corte ID '.$_REQUEST['idcorte'], $_user->idusuario);
			return array ( 'idcorte' => $this->idcorte );
		}
	}

}
?>