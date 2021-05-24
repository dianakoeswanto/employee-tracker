const inquirer = require('inquirer');
const cTable = require('console.table');
const DepartmentApplication = require('./application/department_application');
const RoleApplication = require('./application/role_application');
const EmployeeApplication = require('./application/employee_application');

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
        "Delete Employee",
        "Update Manager",
        "Update Employee's Role",
        "View Employee's by Manager",
        "View Budget by Department",
        "Quit",
        new inquirer.Separator(),
    ]
}

class Prompt {
    constructor() {
        this.departmentApp = new DepartmentApplication();
        this.roleApp = new RoleApplication();
        this.employeeApplication = new EmployeeApplication();
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
            case("Add Employee"):
                await this.employeeApplication.add();
                break;
            case("View All Employees"):
                console.table(await this.employeeApplication.getAll());
                break;
            case("Delete Employee"):
                await this.employeeApplication.delete();
                break;
            case("Update Manager"):
                await this.employeeApplication.updateManager();
                break;
            case("Update Employee's Role"):
                await this.employeeApplication.updateRole();
                break;
            case("View Employee's by Manager"):
                console.table(await this.employeeApplication.viewByManager());
                break;
            case("View Budget by Department"):
                console.table(await this.departmentApp.viewBudget());
                break;
            default:
                console.log("Good Bye");
                process.exit();
            }
        }
    }
}


module.exports = Prompt;