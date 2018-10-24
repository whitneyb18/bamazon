DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;


CREATE TABLE products(
item_id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100),
department_name VARCHAR(100),
price DECIMAL(13,2), 
stock_quantity INTEGER(10),
PRIMARY KEY(item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Pet Cheetah", "Pet", 400.50, 3),
("Invisibility Cloak", "Clothing", 999999.99, 1),
("Breath Mints", "Food/Beverage", 1.99, 1500),
("Eggo Waffles (24 pack)", "Food/Beverage", 5.99, 850),
("Green Dragon Ale", "Food/Beverage", 10.99, 300),
("Kyber Crystal", "Collectibles/Fine Art", 100000.00, 2),
("BoomerAang", "Toys/Games", 100.88, 3290),
("Communicator", "Electronics", 898.99, 345),
("Shawarma", "Food/Beverage", 6.99, 20),
("Bag of Holding", "Luggage/Travel", 2500.00, 45);