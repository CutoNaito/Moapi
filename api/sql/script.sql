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

CREATE TABLE `posts`(
	`ID` CHAR(36) PRIMARY KEY NOT NULL,
	`ID_users` CHAR(36) NOT NULL,
	CONSTRAINT `ID_users_post_constr` FOREIGN KEY(`ID_users`) REFERENCES `users`(`ID`),
	`title` VARCHAR(255),
	`body` VARCHAR(3000) 
);

CREATE TABLE `comments`(
	`ID` CHAR(36) PRIMARY KEY NOT NULL,
	`ID_users` CHAR(36) NOT NULL,
	`ID_posts` CHAR(36) NOT NULL,
	CONSTRAINT `ID_users_comment_constr` FOREIGN KEY(`ID_users`) REFERENCES `users`(`ID`),
	CONSTRAINT `ID_posts_comment_constr` FOREIGN KEY(`ID_posts`) REFERENCES `posts`(`ID`),
	`body` VARCHAR(3000)
);

SELECT * FROM comments