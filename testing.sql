CREATE DATABASE IF NOT EXISTS test;
USE test;

CREATE TABLE `User` (
	`UserID` INT NOT NULL AUTO_INCREMENT,
	`Name` varchar(15),
	`Pass` varchar(15) NOT NULL,
	`Email` varchar(25) NOT NULL,
	PRIMARY KEY (`UserID`)
);

CREATE TABLE `Messages` (
	`MessageID` INT NOT NULL AUTO_INCREMENT,
	`UserID` INT NOT NULL,
	`Text` varchar(255) ,
	`TimeSent` TIMESTAMP,
	PRIMARY KEY (`MessageID`)
);

ALTER TABLE `Messages` ADD CONSTRAINT `Messages_fk0` FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`);

