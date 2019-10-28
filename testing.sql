
DROP DATABASE TEST;
CREATE DATABASE IF NOT EXISTS test;
USE test;

CREATE TABLE `User` (
	`UserID` INT NOT NULL AUTO_INCREMENT,
	`Name` varchar(15),
	`Pass` varchar(15) NOT NULL,
	`Email` varchar(25) NOT NULL UNIQUE,
	`Birth` date,
	`Gender` varchar(15),
	PRIMARY KEY (`UserID`)
);

CREATE TABLE `Messages` (
	`MessageID` INT NOT NULL AUTO_INCREMENT,
	`UserID` INT NOT NULL,
	`Text` varchar(255),
	`TimeSent` TIMESTAMP,
	PRIMARY KEY (`MessageID`)
);

CREATE TABLE `Friends`(
	`UserID` INT NOT NULL,
	`FriendsID` INT NOT NULL,
	`ID` INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`ID`)
);

ALTER TABLE `Messages` ADD CONSTRAINT `Messages_fk0` FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;
