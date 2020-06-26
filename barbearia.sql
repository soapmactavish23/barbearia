-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.0-dmr-log - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Copiando estrutura do banco de dados para barbearia
CREATE DATABASE IF NOT EXISTS `barbearia` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `barbearia`;


-- Copiando estrutura para tabela barbearia.agenda
CREATE TABLE IF NOT EXISTS `agenda` (
  `idagenda` int(11) NOT NULL AUTO_INCREMENT,
  `idcliente` int(11) DEFAULT '0',
  `idusuario` int(11) NOT NULL DEFAULT '0',
  `idcorte` int(11) NOT NULL DEFAULT '0',
  `data` datetime NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'EM ABERTO',
  `dt_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idagenda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela barbearia.cliente
CREATE TABLE IF NOT EXISTS `cliente` (
  `idcliente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `cpf` varchar(15) NOT NULL,
  `contato` varchar(20) NOT NULL,
  `dt_nascimento` date NOT NULL DEFAULT '0000-00-00',
  PRIMARY KEY (`idcliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela barbearia.corte
CREATE TABLE IF NOT EXISTS `corte` (
  `idcorte` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `foto` longblob NOT NULL,
  `preco` double NOT NULL,
  `descricao` text NOT NULL,
  `dt_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idcorte`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela barbearia.fotos
CREATE TABLE IF NOT EXISTS `fotos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(60) NOT NULL,
  `conteudo` mediumblob NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `tamanho` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela barbearia.produto
CREATE TABLE IF NOT EXISTS `produto` (
  `idproduto` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `foto` longblob NOT NULL,
  `preco` double NOT NULL,
  `descricao` text NOT NULL,
  `dt_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idproduto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela barbearia.transacao
CREATE TABLE IF NOT EXISTS `transacao` (
  `idtransacao` int(11) NOT NULL AUTO_INCREMENT,
  `transacao` text NOT NULL,
  `idusuario` int(11) NOT NULL,
  `dt_transacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idtransacao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela barbearia.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `cpf` varchar(15) NOT NULL,
  `email` varchar(45) NOT NULL,
  `dt_nascimento` date NOT NULL DEFAULT '0000-00-00',
  `senha` varchar(50) NOT NULL,
  `permissao` text NOT NULL,
  `contato` varchar(50) NOT NULL,
  `funcao` varchar(50) DEFAULT NULL,
  `foto` longblob,
  `ativado` char(1) NOT NULL DEFAULT 'S',
  `dt_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
