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

var transactionSale;

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
        choices: ['Buy an Item', 'Exit Program']
    }]).then(function(answer) {
        switch (answer.action) {
            case 'Buy an Item':
                buyItem();
                break;
            case 'Exit Program':
                exitProgram();
        }
    });
}

function buyItem() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(columnify(res, {
            columnSplitter: ' | '
        }));
        inquirer.prompt([{
            type: 'input',
            message: 'What is the item_id of the product you would like to buy?',
            name: 'id'
        }, {
            type: 'input',
            message: 'How many units of the product would you like to buy?',
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
                if (parseInt(answer.units) > parseInt(res1[0].stock_quantity)) {
                    console.log('Insufficient quantity!');
                    connection.end();
                } else {
                    transactionSale = parseInt(answer.units) * res1[0].price;
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: res1[0].stock_quantity - parseInt(answer.units),
                        product_sales: res1[0].product_sales + transactionSale
                    }, {
                        item_id: answer.id
                    }], function(err2, res2) {
                        if (err2) throw err2;
                        console.log('You spent $' + transactionSale + '.');
                        connection.query("SELECT * FROM products INNER JOIN departments ON products.department_name = departments.department_name WHERE item_id = " + answer.id, function(err3, res3) {
                            if (err3) throw err3;
                            if (res3.length === 0) {
                                connection.query("INSERT INTO departments SET ?", { department_name: res1[0].department_name }, function(err4, res4) {
                                    if (err4) throw err4;
                                    connection.query("SELECT * FROM departments WHERE ?", { department_name: res1[0].department_name }, function(err5, res5) {
                                        if (err5) throw err5;
                                        connection.query("UPDATE departments SET ? WHERE ?", [{
                                            total_sales: res5[0].total_sales + transactionSale
                                        }, {
                                            department_name: res1[0].department_name
                                        }], function(err6, res6) {
                                            if (err6) throw err6;
                                        });
                                        connection.end();
                                    });
                                });
                            } else {
                                connection.query("SELECT * FROM departments WHERE ?", { department_name: res1[0].department_name }, function(err5, res5) {
                                    if (err5) throw err5;
                                    connection.query("UPDATE departments SET ? WHERE ?", [{
                                        total_sales: res5[0].total_sales + transactionSale
                                    }, {
                                        department_name: res1[0].department_name
                                    }], function(err6, res6) {
                                        if (err6) throw err6;
                                    });
                                    connection.end();
                                });
                            }
                        });
                    });
                }
            });
        });
    });
}

function exitProgram() {
    console.log('You have ended the program.');
    connection.end();
}
