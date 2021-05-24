const inquirer = require("inquirer");
const EmployeeDAO = require("../dao/employee_dao");
const RoleDAO = require("../dao/role_dao");

const roleDAO = new RoleDAO();
const employeeDAO = new EmployeeDAO();

const toEmployeeChoices = (employees) => {
    return employees.map((employee) => { 
        return `${employee.id} - ${employee.first_name} ${employee.last_name}`;
    });
}

class EmployeeApplication {
    constructor() {
        this.employees = [];
    }

    questions(roles) {
        return [
                {
                    type: 'input',
                    name: 'firstname',
                    message: `What is the employee's first name?`,
                    validate: (input) => {
                        return input ? true : "Please enter a valid first name";
                    },
                },
                {
                    type: 'input',
                    name: 'lastname',
                    message: `What is the employee's last name?`,
                    validate: (input) => {
                        return input ? true : "Please enter a valid last name";
                    },
                }
        ]
    }

    async whichRole(roles, questionMsg) {
        const question = {
            type: 'list',
            name: 'role',
            message: questionMsg,
            choices() {
                return roles.map((role) => {
                    return `${role.id} - ${role.title}`;
                });
            },
        };

        const answer = await inquirer.prompt(question);
        return answer.role.split(' ')[0];
    }

    async whichManager(managers, questionMsg) {
        const question = [
            {
                type: 'list',
                name: 'manager',
                message: questionMsg,
                choices() {
                    const managersOptions = toEmployeeChoices(managers);
                    managersOptions.push("No Manager");
                    managersOptions.push(new inquirer.Separator());
                    return managersOptions;
                }
            }
        ]

        const answer = await inquirer.prompt(question);
        return answer.manager === "No Manager" 
                        ? null 
                        : answer.manager.split(' ')[0];
    }

    async whichEmployee(employees, questionMsg) {
        const question = [
            {
                type: 'list',
                name: 'employee',
                message: questionMsg, 
                choices() {
                    const employeesOptions = toEmployeeChoices(employees);
                    employeesOptions.push(new inquirer.Separator());
                    return employeesOptions;
                }
            }
        ]

        const answer = await inquirer.prompt(question);
        return answer.employee.split(' ')[0];
    }

    async add() {
        const roles = await roleDAO.getAll();
        const answer = await inquirer.prompt(this.questions());
        const selectedRoleId = await this.whichRole(roles, "What is the employee's role?"); 
        
        const employees = await employeeDAO.getAll();
        const selectedManagerId = await this.whichManager(employees, "Who is the employee's manager?");

        employeeDAO.add(answer.firstname, answer.lastname, selectedRoleId, selectedManagerId);
    }

    async getAll() {
        this.employees = await employeeDAO.getAll();
        return this.employees;
    }

    async delete() {
        await this.getAll();

        const employeeToRemove = await this.whichEmployee(this.employees, 
                                        "Which employee would you like to remove?");

        const affected = employeeDAO.delete(employeeToRemove);
    }

    async updateManager() {
        await this.getAll();

        const employeeToUpdateId = await this.whichEmployee(this.employees, 
                                        "Which employee would you like to update?");
        
        const newManagerId = await this.whichManager(this.employees, 
                                        "Who is the new manager for this employee?");

        await employeeDAO.updateManager(employeeToUpdateId, newManagerId);
    }

    async updateRole() {
        await this.getAll();

        const employeeToUpdateId = await this.whichEmployee(this.employees, 
                                        "Which employee would you like to update?");
        
        const roles = await roleDAO.getAll();
        const newRoleId = await this.whichRole(roles, 
                                        "What is the new role for this employee?");

        await employeeDAO.updateRole(employeeToUpdateId, newRoleId);
    }

    async viewByManager() {
        const currentManagers = await employeeDAO.getManagers();

        const selectedManagerId = await this.whichEmployee(currentManagers, 
                                        "Please select a manager?");
        
        return await employeeDAO.getByManager(selectedManagerId);
    }
}

module.exports = EmployeeApplication;