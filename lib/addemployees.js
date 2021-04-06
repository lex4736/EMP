const mysql = require("mysql");
const view = require("./viewemployees");
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
       let position = [];
       for(let i = 0; i < rolesResults.length; i++) {
           position.push(rolesResults[i].title);
       }
        let options = [
         {
             type: "input",
             message: "First Name",
             name: "firstName",
             default: "Patrick"
         },
         {
             type: "input",
             message: "Last Name",
             name: "lastName",
             default: "Starr"
         },
         {
             type: "list",
             message: "Position",
             name: "role",
             choices: position
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
                 console.log("You have added " + answers.firstName + " " + answers.lastName );
                 main.start();
             });
         });
     });
 };