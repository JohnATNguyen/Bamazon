var mysql = require('mysql');
var inquirer = require('inquirer');
var columnify = require('columnify');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'pass',
    database: 'Bamazon'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Your connection id is ' + connection.threadId);
    main();
});

function main() {
    inquirer.prompt([{
        name: 'action',
        type: 'list',
        message: 'Please pick an option:',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit Program']
    }]).then(function(answer) {
        switch (answer.action) {
            case 'View Products for Sale':
                viewProducts();
                break;
            case 'View Low Inventory':
                lowInventory();
                break;
            case 'Add to Inventory':
                addInventory();
                break;
            case 'Add New Product':
                newProduct();
                break;
            case 'Exit Program':
                exitProgram();
        }
    });
}

function viewProducts() {
    connection.query("SELECT products.item_id, products.product_name, products.price, products.stock_quantity FROM products", function(err, res) {
        if (err) throw err;
        console.log(columnify(res, {
            columnSplitter: ' | '
        }));
        main();
    });
}

function lowInventory() {
    var lowMarker = 5;
    connection.query("SELECT * FROM products WHERE stock_quantity BETWEEN ? and ?", [0, lowMarker], function(err, res) {
        if (err) throw err;
        console.log(columnify(res, {
            columnSplitter: ' | '
        }));
        main();
    });
}

function addInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(columnify(res, {
            columnSplitter: ' | '
        }));
        inquirer.prompt([{
            type: 'input',
            message: 'What is the item_id of the product to which you would like to add inventory?',
            name: 'id'
        }, {
            type: 'input',
            message: 'How many units of the product would you like to add?',
            name: 'units',
            validate: function(value) {
                if (isNaN(value) === false && value > 0 && value < 1000000) {
                    return true;
                }
                return false;
            }
        }]).then(function(answer) {
            connection.query("SELECT * FROM products WHERE item_id = " + answer.id, function(err1, res1) {
                if (err1) throw err1;
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: parseInt(res1[0].stock_quantity) + parseInt(answer.units)
                }, {
                    item_id: answer.id
                }], function(err2, res2) {
                    if (err2) throw err2;
                    console.log('You added ' + answer.units + ' ' + res1[0].product_name + 's.');
                    main();
                });
            });
        });
    });
}

function newProduct() {
    inquirer.prompt([{
        name: 'name',
        message: 'What is the product\'s name?'
    }, {
        name: 'department',
        message: 'Which department should it be placed in?'
    }, {
        name: 'price',
        message: 'How much does it cost?',
        validate: function(value) {
            if (isNaN(value) === false && value > 0 && value < 1000000) {
                return true;
            }
            return false;
        }
    }, {
        name: 'quantity',
        message: 'How many?',
        validate: function(value) {
            if (isNaN(value) === false && value > 0 && value < 1000000) {
                return true;
            }
            return false;
        }
    }]).then(function(answer) {
        connection.query('INSERT INTO products SET ?', {
            product_name: answer.name,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity
        }, function(err, res) {
            if (err) throw err;
            console.log('You added ' + answer.quantity + ' ' + answer.name + '(s) in ' + answer.department + ' at $' + answer.price + ' each.');
            main();
        });
    });
}

function exitProgram() {
    console.log('You have ended the program.');
    connection.end();
}