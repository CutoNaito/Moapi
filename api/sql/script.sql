CREATE DATABASE api_app;
USE api_app;

CREATE TABLE `users`(
	`ID` CHAR(36) PRIMARY KEY NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `verified` BOOLEAN NOT NULL,
    `verification_code` VARCHAR(255),
    `isAdmin` TINYINT NOT NULL DEFAULT 0
);

CREATE TABLE `stored_URIs`(
	`ID` CHAR(36) PRIMARY KEY NOT NULL,
    `ID_users` CHAR(36) NOT NULL,
    CONSTRAINT `ID_users_constr` FOREIGN KEY(`ID_users`) REFERENCES `users`(`ID`),
    `URI` VARCHAR(255) NOT NULL,
    `method` ENUM('GET', 'POST', 'PUT', 'DELETE')
);

CREATE TABLE `favorites`(
	`ID` CHAR(36) PRIMARY KEY NOT NULL,
    `ID_users` CHAR(36) NOT NULL,
    CONSTRAINT `ID_users_fav_constr` FOREIGN KEY(`ID_users`) REFERENCES `users`(`ID`),
    `URI` VARCHAR(255) NOT NULL,
    `method` ENUM('GET', 'POST', 'PUT', 'DELETE')
);