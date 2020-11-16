CREATE DATABASE IF NOT EXISTS node_js;

USE node_js;

CREATE TABLE `node_js`.`item1` ( 
`id` INT NOT NULL AUTO_INCREMENT , 
`name` VARCHAR(250) NOT NULL , 
`number` INT NOT NULL , 
PRIMARY KEY (`id`)) ENGINE = InnoDB;
