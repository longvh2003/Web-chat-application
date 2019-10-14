drop database chat;
create database chat;
use chat;

drop table if exists customer;
create table customer(
	`user_name` varchar(20) not null,
	`password` varchar(20) not null,
	primary key(`user_name`)
) engine=InnoDB default charset=utf8;

insert into customer(user_name,password) value ('user1','user1'); 