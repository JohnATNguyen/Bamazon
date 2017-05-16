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
})

function main() {
    inquirer.prompt([{
        name: 'action',
        type: 'list',
        message: 'Please pick an option:',
        choices: ['View Product Sales by Department', 'Update Overhead Cost for a Department', 'Create New Department', 'Exit Program']
    }]).then(function(answer) {
        switch (answer.action) {
            case 'View Product Sales by Department':
                viewDepartments();
                break;
            case 'Update Overhead Cost for a Department':
                updateOverhead();
                break;
            case 'Create New Department':
                createDepartment();
                break;
            case 'Exit Program':
                exitProgram();
        }
    });
}

function viewDepartments() {
    connection.query("SELECT *, total_sales - overhead_costs AS total_profit FROM departments", function(err, res) {
        if (err) throw err;
        console.log(columnify(res, {
            columnSplitter: ' | '
        }));
        main();
    });
}

function updateOverhead() {
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;
        console.log(columnify(res, {
            columnSplitter: ' | '
        }));
        inquirer.prompt([{
            type: 'input',
            message: 'What is the department_id of the department for which you would like to update overhead costs?',
            name: 'id'
        }, {
            type: 'input',
            message: 'What is the new overhead costs of the department?',
            name: 'costs',
            validate: function(value) {
                if (isNaN(value) === false && value > 0 && value < 10000000) {
                    return true;
                }
                return false;
            }
        }]).then(function(answer) {
            connection.query("SELECT * FROM departments WHERE department_id = " + answer.id, function(err1, res1) {
                if (err1) throw err1;
                connection.query("UPDATE departments SET ? WHERE ?", [{
                    overhead_costs: parseInt(answer.costs)
                }, {
                    department_id: answer.id
                }], function(err2, res2) {
                    if (err2) throw err2;
                    console.log(res1[0].department_name.charAt(0).toUpperCase() + res1[0].department_name.slice(1) + '\'s overhead costs is now ' + parseInt(answer.costs) + '.');
                    main();
                });
            });
        });
    });
}

function createDepartment() {
    inquirer.prompt([{
        name: 'name',
        message: 'What is the department\'s name?'
    }, {
        name: 'overhead',
        message: 'What is the department\'s overhead costs?',
        validate: function(value) {
            if (isNaN(value) === false && value > 0 && value < 10000000) {
                return true;
            }
            return false;
        }
    }]).then(function(answer) {
        connection.query('INSERT INTO departments SET ?', {
            department_name: answer.name,
            overhead_costs: answer.overhead
        }, function(err, res) {
            if (err) throw err;
            console.log('You added ' + answer.name + ' with an overhead cost of $' + answer.overhead + '.');
            main();
        });
    });
}

function exitProgram() {
    console.log('You have ended the program.');
    connection.end();
}
