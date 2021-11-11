mysqldump: [Warning] Using a password on the command line interface can be insecure.
-- MySQL dump 10.13  Distrib 5.7.36, for Linux (x86_64)
--
-- Host: localhost    Database: teste-app
-- ------------------------------------------------------
-- Server version	5.7.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `teste-app`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `teste-app` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `teste-app`;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clientes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` text,
  `telefone` varchar(255) DEFAULT NULL,
  `cpf` varchar(20) DEFAULT NULL,
  `data_cadastro` timestamp(6) NULL DEFAULT NULL,
  `data_alteracao` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Pedro','(62) 98180-0001','007.412.123-12','2021-10-07 10:53:01.000000',NULL),(2,'Vivian','(62) 98010-8212','212.623.22-11','2021-10-07 10:53:01.000000',NULL),(3,'João','(11) 98123-2142','999.623.312-11','2021-10-07 10:53:01.000000',NULL),(10,'Juliana','(62) 98112-1233','111.123.123-12','2021-11-07 19:11:53.000000','2021-11-08 22:41:56.694000');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendas`
--

DROP TABLE IF EXISTS `vendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente_id` int(255) DEFAULT NULL,
  `codigo_nota_fiscal` varchar(255) DEFAULT NULL,
  `data_cadastro` datetime(6) DEFAULT NULL,
  `data_atualizado` datetime(6) DEFAULT NULL,
  `valor_pago` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendas`
--

LOCK TABLES `vendas` WRITE;
/*!40000 ALTER TABLE `vendas` DISABLE KEYS */;
INSERT INTO `vendas` VALUES (1,1,'10','2021-10-07 11:06:22.000000','2021-10-07 11:06:22.000000',80.00),(2,1,'11','2021-10-07 11:10:36.000000',NULL,100.00),(3,1,'14','2021-10-07 11:10:51.000000',NULL,200.00),(4,2,'66','2021-10-07 13:15:05.000000',NULL,10.00);
/*!40000 ALTER TABLE `vendas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendas_itens`
--

DROP TABLE IF EXISTS `vendas_itens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendas_itens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `venda_id` int(11) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `quantidade` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendas_itens`
--

LOCK TABLES `vendas_itens` WRITE;
/*!40000 ALTER TABLE `vendas_itens` DISABLE KEYS */;
INSERT INTO `vendas_itens` VALUES (1,1,'Caneta',10.00,2),(2,1,'Lapis',20.00,6),(3,2,'Borracha',2.00,30),(4,2,'Canetinha Azul',4.00,4),(5,2,'Giz ',3.00,10),(6,3,'Quadro',1.00,50),(7,4,'Giz',2.00,10);
/*!40000 ALTER TABLE `vendas_itens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'teste-app'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-11 21:01:32
