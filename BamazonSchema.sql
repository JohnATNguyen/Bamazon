CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
	item_id INTEGER(11) auto_increment NOT NULL,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(7, 2),
    stock_quantity INTEGER(11),
    PRIMARY KEY(item_id)
);

SELECT * FROM products;

CREATE TABLE departments (
	department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50),
    overhead_costs DECIMAL(8, 2),
    total_sales DECIMAL(8, 2),
    PRIMARY KEY(department_id)
);

SELECT * FROM departments;

ALTER TABLE products ADD COLUMN product_sales DECIMAL(8, 2);

SELECT * FROM products INNER JOIN departments ON products.department_name = departments.department_name WHERE item_id = 1;