const EmployeeDAO = require("../dao/employee_dao");

class EmployeeApplication {
    constructor() {
        this.employees = [];
    }

    static async questions() {
        const roles = await RoleDAO.getAll();
        const rolesOptions = roles.map((role) => {role.title});

        const managers = await EmployeeDAO.getManagers();
        console.log(managers);
        const managerOptions = managers.map((manager) => { 
            return `${manager.firstname} ${manager.lastname}` 
        });

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
                },
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the employee's role?",
                    choices: rolesOptions,
                },
                {
                    types: 'list',
                    name: 'manager',
                    message: "Who is the employee's manager?",
                    choices: managerOptions
                }
        ]
    }
}

module.exports = EmployeeDAO;