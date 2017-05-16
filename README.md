# Bamazon

Bamazon is a CLI application built using Node.js and MySQL that allows customers to buy items from, managers to run, and supervisors to operate a store.

## Getting Started

These instructions will get you a copy of Bamazon up and running on your local machine for development purposes.

### Prerequisites

Please install the required npm modules by running the following from your command line (Bash, for example), in the folder containing all your files (specifically package.json).

```
npm install
```

### Installing

A step by step series of examples that tell you how to get a development env running:

* Run the following SQL commands (in MySQL Workbench or MySQL CLI, for example) or to create and use a database called Bamazon.

```sql
CREATE DATABASE Bamazon;

USE Bamazon;
```

* Then run the following SQL commands to create two tables: products and departments.

```sql
CREATE TABLE products (
    item_id INTEGER(11) auto_increment NOT NULL,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(7, 2),
    stock_quantity INTEGER(11),
    PRIMARY KEY(item_id)
);

CREATE TABLE departments (
    department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50),
    overhead_costs DECIMAL(8, 2),
    total_sales DECIMAL(8, 2),
    PRIMARY KEY(department_id)
);
```

* Then run the following SQL command to add the product_sales column that will be used in Supervisor mode.

```sql
ALTER TABLE products ADD COLUMN product_sales DECIMAL(8, 2);
```

* Finally run the following SQL command to populate the products table with dummy entries.

```sql
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("sock", "clothing", 1.00, 500);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("undies", "clothing", 2.00, 500);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("book", "books", 10.00, 350);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("car", "auto", 10000.00, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("laptop", "electronics", 1000.00, 100);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("iPhone", "electronics", 500.00, 200);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("toy", "toys", 20, 250);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("TV", "electronics", 600, 250);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("pen", "office supplies", 0.50, 1000);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("video game", "entertainment", 50, 300);
```

## Usage

These instructions will show you how to use Bamazon in all 3 modes: customer, manager, and supervisor.

### Customer mode (bamazonCustomer.js)

Please run the following from your command line (Bash, for example) in the folder containing all your files (specifically bamazonCustomer.js).

```
node bamazonCustomer.js
```

Then refer to the following video for a short full demonstration of all three modes:

[![Bamazon](http://img.youtube.com/vi/dh1dlIaj7Wk/0.jpg)](http://www.youtube.com/watch?v=dh1dlIaj7Wk)

### Manager mode (bamazonManager.js)

Please run the following from your command line (Bash, for example) in the folder containing all your files (specifically bamazonManager.js).

```
node bamazonManager.js
```

Then refer to the following video for a short full demonstration of all three modes:

[![Bamazon](http://img.youtube.com/vi/dh1dlIaj7Wk/0.jpg)](http://www.youtube.com/watch?v=dh1dlIaj7Wk)

### Supervisor mode (bamazonSupervisor.js)

Please run the following from your command line (Bash, for example) in the folder containing all your files (specifically bamazonSupervisor.js).

```
node bamazonSupervisor.js
```

Then refer to the following video for a short full demonstration of all three modes:

[![Bamazon](http://img.youtube.com/vi/dh1dlIaj7Wk/0.jpg)](http://www.youtube.com/watch?v=dh1dlIaj7Wk)

## Built With

* [Node.js](https://nodejs.org/) - the back-end framework used
* [MySQL](https://www.mysql.com/) - database management

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/drjohnsez/Bamazon/tags).

## Authors

* **John Nguyen** - *Initial work* - [John Nguyen](https://github.com/drjohnsez)

See also the list of [contributors](https://github.com/drjohnsez/Bamazon/contributors) who participated in this project.

## Acknowledgments

* Hat tip to anyone who's code was used.
* Thank you to UCLA Coding Bootcamp's staff for the education and support.