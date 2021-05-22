const DepartmentApplication = require('./application/department_application');
const inquirer = require('inquirer');
const cTable = require('console.table');
const RoleApplication = require('./application/role_application');

const questions = {
    type: 'list',
    name: 'option',
    message: `What would you like to do?`,
    choices: [
        "Add Department",
        "View All Departments",
        "Delete Department",
        "Add Role",
        "View All Roles",
        "Delete Role",
        "Add Employee",
        "View All Employees",
        "Quit"
    ]
}

class Prompt {
    constructor() {
        this.departmentApp = new DepartmentApplication();
        this.roleApp = new RoleApplication();
    }

    async start() {
        let quit = false;
    
        while(!quit) {
        const answer = await inquirer.prompt(questions);
        quit = answer.option === "Quit";
    
        switch(answer.option) {
            case("Add Department"):
                await this.departmentApp.add();
                break;
            case("View All Departments"):
                console.table(await this.departmentApp.getAll());
                break;
            case("Delete Department"):
                await this.departmentApp.delete();
                break;
            case("Add Role"):
                await this.roleApp.add();
                break;
            case("View All Roles"):
                console.table(await this.roleApp.getAll());
                break;
            case("Delete Role"):
                await this.roleApp.delete();
                break;
            default:
                console.log("Good Bye");
                process.exit();
            }
        }
    }
}


module.exports = Prompt;