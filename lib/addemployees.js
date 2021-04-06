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

exports.newEmployee = () => {
    view.getAllRoles(function(rolesResults) {
       const roles = [];
       for(let i = 0; i < rolesResults.length; i++) {
           roles.push(rolesResults[i].title);
       }
        let options = [
         {
             type: "input",
             message: "Pls type first name",
             name: "firstName",
             default: "Patrick"
         },
         {
             type: "input",
             message: "Pls type last name",
             name: "lastName",
             default: "Star"
         },
         {
             type: "list",
             message: "Pls select title",
             name: "role",
             choices: roles
         }
         ];
 
         inq.prompt(options)
         .then((answers) => {
             let roleId = null;
             for(let i= 0; i < rolesResults.length; i++) {
                 if(rolesResults[i].title === answers.role) {
                     roleId = rolesResults[i].role_id
                 }
             }
             connection.query("INSERT INTO employees SET ?",
                 {
                     first_name: answers.firstName,
                     last_name: answers.lastName,
                     emp_role_id: roleId
                 },
             function(err,results) {
                 if(err) throw err;
                 console.log("Successfully added " + answers.firstName + " " + answers.lastName );
                 main.start();
             });
         });
     });
 };
 