const mysql = require("mysql");
const view = require("./view");
const inq = require("inquirer");
const main = require("../main");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "office_db"
});

exports.updateRole = () => {
    view.getAllEmployees(function (employeeResults) {
        console.log("test here:");
        console.log(employeeResults);
        let employees = [];
        for (let i = 0; i < employeeResults.length; i++) {
            let fullName = {
                name: employeeResults[i].first_name + ' ' + employeeResults[i].last_name,
                value: {
                    id: employeeResults[i].emp_id,
                    firstname: employeeResults[i].first_name,
                    lastname: employeeResults[i].last_name
                }
            };

            employees.push(fullName)
        };

        inq.prompt([
            {
                type: "list",
                message: "Which employee would you like to update?",
                name: "employee",
                choices: employees
            }
        ]).then((answers) => {
            view.getAllRoles(function (rolesResults) {
                const roles = [];
                console.log(answers.employee);

                for (let i = 0; i < rolesResults.length; i++) {
                   let fullRole = {
                        name: rolesResults[i].title,
                        value: {
                            id: rolesResults[i].role_id,
                            role: rolesResults[i].title,
                        }
                    }
                    roles.push(fullRole);
                };

                inq.prompt([
                    {
                        type: "list",
                        message: `Which role would you like to update ${answers.employee.firstname} to?`,
                        name: "role",
                        choices: roles
                    }
                ]).then((results) => {
                    console.log("results...")
                    console.log(results.role)
                    connection.query("UPDATE employees SET emp_role_id = ? WHERE emp_id = ?",[results.role.id, answers.employee.id],function (err, results) {
                        if (err) throw err;
                        console.log("Successfully updated " + answers.employee.id);
                        main.start();
                    })
                });
            });
        });
    });
};