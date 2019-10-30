DROP DATABASE IF EXISTS webchat;
CREATE DATABASE webchat;
USE webchat;

CREATE TABLE `User` (
	`user_id` int NOT NULL AUTO_INCREMENT,
	`email` varchar(25) NOT NULL UNIQUE,
	`username` varchar(25) NOT NULL UNIQUE,
	`password` varchar(20) NOT NULL,
	`first_name` varchar(10) NOT NULL,
	`last_name` varchar(10) NOT NULL,
	`isModerate` BOOLEAN NOT NULL DEFAULT false,
	`friend` int NOT NULL,
	PRIMARY KEY (`user_id`,`email`,`username`)
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

INSERT INTO user (email, username, password, first_name, last_name, isModerate, friend) VALUES ('huy@123.vn', 'huy1234', '12345', 'huy', 'quang', true, 0);
INSERT INTO user (email, username, password, first_name, last_name, isModerate, friend) VALUES ('huy@12345.vn', 'huy12345', '12345', 'huy', 'quang', true, 0);
INSERT INTO chatroom VALUES (1, 5);