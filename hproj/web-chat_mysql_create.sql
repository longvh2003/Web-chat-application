DROP DATABASE IF EXISTS webchat;
CREATE DATABASE webchat;
USE webchat;

CREATE TABLE `User` (
	`user_id` int NOT NULL AUTO_INCREMENT,
	`email` varchar(25) NOT NULL UNIQUE,
	`username` varchar(25) NOT NULL UNIQUE,
	`password` varchar(20) NOT NULL,
	`dateOfBirth` date,
	`gender` varchar(10),
	`isModerate` BOOLEAN NOT NULL DEFAULT false,
	`friend` int,
	PRIMARY KEY (`user_id`,`email`,`username`)
);

CREATE TABLE friends(
	currentUser int not null,
	friendUser int not null,
	primary key(currentUser,friendUser)
);

CREATE TABLE `Message` (
	`message_id` int NOT NULL AUTO_INCREMENT,
	`content` varchar(255) NOT NULL,
	`from_user` varchar(255) NOT NULL,
	`to_chatroom` int NOT NULL,
	PRIMARY KEY (`message_id`)
);

CREATE TABLE `Chatroom` (
	`chatroom_id` int NOT NULL AUTO_INCREMENT,
	`member` int(25) NOT NULL,
	PRIMARY KEY (`chatroom_id`)
);

CREATE TABLE `User-Chatroom` (
	`uc_id` int NOT NULL AUTO_INCREMENT,
	`user_id` varchar(255) NOT NULL,
	`chatroom_id` int NOT NULL,
	PRIMARY KEY (`uc_id`)
);

ALTER TABLE `Message` ADD CONSTRAINT `Message_fk0` FOREIGN KEY (`from_user`) REFERENCES `User`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Message` ADD CONSTRAINT `Message_fk1` FOREIGN KEY (`to_chatroom`) REFERENCES `Chatroom`(`chatroom_id`) ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE `User-Chatroom` ADD CONSTRAINT `User-Chatroom_fk0` FOREIGN KEY (`user_id`) REFERENCES `User`(`username`);

ALTER TABLE `User-Chatroom` ADD CONSTRAINT `User-Chatroom_fk1` FOREIGN KEY (`chatroom_id`) REFERENCES `Chatroom`(`chatroom_id`) ON DELETE CASCADE ON UPDATE CASCADE;

