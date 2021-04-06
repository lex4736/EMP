const mysql = require("mysql");
const inq = require("inquirer");
const table = require("console.table");
const add = require("./lib/addemployees");
const update = require("./lib/updateemployees");
const view = require("./lib/viewemployees");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "office_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    exports.start();
  });
  
  exports.start = () => {
      inq.prompt([
          {
              type: "list",
              message: "Select a task",
              name: "choice",
              choices: [
                  "View Employees",
                  "Add Employee",
                  "Update Employee",
                  "leave"                
              ]
          }
      ])
      .then(function(answer) {
        if(answer.choice === "View All Employees") {
          view.viewAllEmployees();
        }
        else if(answer.choice === "Add Employee") {
          add.addEmployee();
        }      
        else if(answer.choice === "Update Employee Role") {
          update.updateRole();
        }
        else if(answer.choice === "EXIT") {
          connection.end();
          return
        }
      });
      
  };
 