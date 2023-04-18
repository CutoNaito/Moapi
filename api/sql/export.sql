-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: api_app
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `api_app`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `api_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `api_app`;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `ID` char(36) NOT NULL,
  `ID_users` char(36) NOT NULL,
  `ID_posts` char(36) NOT NULL,
  `body` varchar(3000) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_users_comment_constr` (`ID_users`),
  KEY `ID_posts_comment_constr` (`ID_posts`),
  CONSTRAINT `ID_posts_comment_constr` FOREIGN KEY (`ID_posts`) REFERENCES `posts` (`ID`),
  CONSTRAINT `ID_users_comment_constr` FOREIGN KEY (`ID_users`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `ID` char(36) NOT NULL,
  `ID_users` char(36) NOT NULL,
  `URI` varchar(255) NOT NULL,
  `method` enum('GET','POST','PUT','DELETE') DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_users_fav_constr` (`ID_users`),
  CONSTRAINT `ID_users_fav_constr` FOREIGN KEY (`ID_users`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES ('14330f0b-92d0-48c1-bab8-8a6598a8fbf7','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/users','GET'),('2a3abb8c-6eb0-4468-969b-62700df18806','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/users/',NULL),('7a712072-74c1-45fe-801e-6f277964a970','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/favorites',NULL),('d69feaba-755b-479f-8934-0e7259e22401','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/favorites',NULL),('df2abed9-f586-4e87-9ce1-9d263cae53bd','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/favorites',NULL);
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `ID` char(36) NOT NULL,
  `ID_users` char(36) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `body` varchar(3000) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_users_post_constr` (`ID_users`),
  CONSTRAINT `ID_users_post_constr` FOREIGN KEY (`ID_users`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stored_URIs`
--

DROP TABLE IF EXISTS `stored_URIs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stored_URIs` (
  `ID` char(36) NOT NULL,
  `ID_users` char(36) NOT NULL,
  `URI` varchar(255) NOT NULL,
  `method` enum('GET','POST','PUT','DELETE') DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_users_constr` (`ID_users`),
  CONSTRAINT `ID_users_constr` FOREIGN KEY (`ID_users`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stored_URIs`
--

LOCK TABLES `stored_URIs` WRITE;
/*!40000 ALTER TABLE `stored_URIs` DISABLE KEYS */;
INSERT INTO `stored_URIs` VALUES ('04acee36-dcfb-4116-8dc5-cd307f3a026b','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/favorites',NULL),('163f1f42-8f38-4d5c-ab8d-427cf6af47f6','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/stored_uris/user/3c7c991a-e7ae-488d-950d-d9be78cef1cf',NULL),('17b95b21-7f48-4329-ab06-81caa84d0946','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/favorites',NULL),('24d457f5-6e0d-4f84-a064-852ba2580852','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/users/',NULL),('260b2349-6864-44cc-8730-936f1a9c67d3','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/favorites',NULL),('4805f8f6-0832-4778-b33b-01dacf16fd48','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/favorites',NULL),('55e47acc-941c-447a-b481-baf5423ed63d','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/favorites',NULL),('5bc6c92c-1f76-4701-ac5c-79c8eaa63ae6','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/stored_uris/user/3c7c991a-e7ae-488d-950d-d9be78cef1cf',NULL),('61b6dbde-5e6f-498f-9572-eb628c6dd3c8','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/stored_uris/user/3c7c991a-e7ae-488d-950d-d9be78cef1cf',NULL),('73d16eaf-1734-45b0-966a-c9b50062cd49','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/favorites',NULL),('744cb0b2-7d9d-4b64-8858-26ddf9535bb8','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/users',NULL),('8677247e-52ca-4216-b1c4-2cd515b2184b','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/favorites',NULL),('97c278e1-3e29-419b-bcb3-be1711cbe0f4','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/stored_uris/user/3c7c991a-e7ae-488d-950d-d9be78cef1cf',NULL),('aabe1fbd-92bb-4700-aea6-f67e090ff5ef','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/users/',NULL),('b0c79667-e35a-4f05-837b-d735b053161a','3c7c991a-e7ae-488d-950d-d9be78cef1cf','http://localhost:4000/stored_uris/',NULL),('be9b2b1e-b10e-4876-8434-57406a9a4bc9','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/users',NULL),('de10166f-9da7-4cb6-b3c7-d9b9e2b29cc8','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/users/',NULL),('e37b1ef5-6227-4730-8a93-c7cbf00f16b4','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/favorites',NULL),('f1855fb5-9791-48e3-9a6f-192acafe8798','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/favorites',NULL),('fb2b7e1e-893c-4d48-8e75-0be8a6c45b46','412da9b3-20b0-4e9a-9e68-55ad53f92a84','http://localhost:4000/favorites',NULL);
/*!40000 ALTER TABLE `stored_URIs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `ID` char(36) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `verification_code` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('05875a5e-8af5-43cb-afb6-2b81d737c93e','cs','michalsivicek@gmail.com','$2b$10$u0bgWdoUzIO5wS4qWiIrE.h56/zTAl1.4XpDyeJH6cQIEduYZnxIC','dhD2PH3shFRrLMDCeCEFA8pS61hQKNda',0,'$2b$10$UXiK2Pzpc5riTl1wF8drUuHIvFxLnT3cfM.JR6hp65ufNanX17stG',0),('1db75e79-47fa-4d52-a22f-cfb263b1bac9','cs','jarablunder@gmail.com','$2b$10$ge0OJz2VoX9jv4H89JwjW.UjkBoUAO9jmvXY9ZcyiKiMDy/PrYBd.','yw8dEzEHXEKYxXBpDKIynPHPIQO5N33c',0,'$2b$10$aORGxbKNBobSto8XFncEruHk8UiD9VVoZGWfUrt2R6GqP3ALu8G7O',0),('3c7c991a-e7ae-488d-950d-d9be78cef1cf','test2','sturma.matej97@gmail.com','$2b$10$q.NEukacRhUyYJRz36N9EOiqjKDm9tU9rTWYwZMzU1qj49mO50ttK','GDg018XQefwvAyZPvQTbMm8NgBVBxigV',1,NULL,0),('412da9b3-20b0-4e9a-9e68-55ad53f92a84','test','loliknightowo@gmail.com','$2b$10$vlTudhznWxaFkW/Rk/o7sOzdwne2zJc6OZ/VRMN2Rsjq2NpWvKUt6','fV2xJPHjIdBq0oa3Lnnrgrjvt6h5xwxJ',1,'$2b$10$C2ZYc3Nazupm7QAjj3Pwh.8iiFPSuN2.20bLGZBbkID1pOTxdxjOS',1),('4bf40ff6-be80-4950-bb0c-a5d6919dd97f','Bobi','tobi258@post.cz','$2b$10$uv/nZnvtWZ7m0bDdFSKMb.owixxTBH3LwooH5hosGk/K5drgkZigq','zs4sqHkj9kYpTv6ElZRQanQmf4D7QG5i',0,'$2b$10$9TUhl6SFCx1nLUyaIm8Y5e/nq7oensJmN74X.Jc8E15POx5VBs64.',0),('59058efb-96c3-4896-ad60-bf7aadc39840','bobi','tobi256@enm.com','$2b$10$UWlqcn2CRLpt8X00DPRGReb3GX1J8kgecPEDbZ5IzKDwipS.fP/a2','0gyOrk6MQisPWS0Xd6uNzKtCY8nnbaFS',0,'$2b$10$7DdpPT7V6uPGVvnQZTec9.lUH5n61ncpDOa91uOSIMPaowXnMdGBm',0),('9bc8121a-ea3b-4c53-beb1-58a25117880b','cs','jarablunder@gmail.com','$2b$10$bCHG18Dvim6Ofcgvr8tNyOrQpk4AovR5aAw397QFn7QCUcB7d7IWO','ScSZAdFw6CnmRpG3ZMRE0s4bcz0JjX6m',0,'$2b$10$dGq3XtXFLk3l4EwPvx1jnujJnCTlPsFsWtlq2pe2Nx8GBJBZcWwCu',0),('9ec99389-e9f9-492e-93f9-7f313d5f6771','test3','matej.sturma@5zsmb.cz','$2b$10$eh53Zk3wVpxCOIHp7PP6C.V3m25vswATiZDR5hPdzF8cx9ZP//a1y','dODBGN6hRVHoHUrPNseEK5y8oNShd83H',1,NULL,0),('ad2d3899-9e5a-4282-bd5d-43bb445c946d','michal03','gamesluxuslp@gmail.com','$2b$10$8VF93kdFvkSDmwmIqpbnle9yaNofBGubuQt/GzwMYronca49TK606','kN6beegDUQ0NKe5i7cHLr2O1laEpj3x3',1,NULL,0),('b01161b0-1ccf-42c9-bd27-1554f76afe18','cutonaito','sturma.matej97@gmail.com','$2b$10$uFMl4hMBUbofNoy9gezWje3O5FPa5jHB5p4bfk0NOBdibtrDjyz2S','lCF1doDh11cT2ozhizMLCFrQSyFkafsm',0,'$2b$10$DF0TFjBPeee0idapmOllgeFxiKWMWh9AHwzQyiX3TAQEKlqcPiZoC',0),('ea0f805b-0938-4f79-ba25-8c758e238520','cs','cs@cs.cz','$2b$10$OY4qpHoEr4v8iVv.jUHgqe0aZ53XHd/ktv.u0XvRWBfbz6.hzm9n2','oxsaOwHilbt0i4FHwiya714LxVwPVRYk',0,'$2b$10$a1AcO27oG6HGGIqnXMsQx.ImmHBNBfkX15GG350FGSXssPwu1q9fK',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-19  0:16:26
