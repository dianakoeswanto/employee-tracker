const inquirer = require("inquirer");
const DepartmentDAO = require("../dao/department_dao");
const RoleDAO = require("../dao/role_dao");

const roleDAO = new RoleDAO();

class RoleApplication {

    addQuestions(departments) {
        return [
                {
                    type: 'input',
                    name: 'title',
                    message: `What is the role's title?`,
                    validate: (input) => {
                        return input ? true : "Please enter a valid title";
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: `What is the avg salary for this role?`,
                    validate: (input) => {
                        return input ? true : "Please enter a valid salary";
                    },
                },
                {
                    type: 'list',
                    name: 'department',
                    message: `What department does this role belong to?`,
                    choices() {
                        const deptToRemove =  departments.map((dpt) => {return dpt.name});
                        deptToRemove.push(new inquirer.Separator());
                        return deptToRemove;
                    } 
                }
            ]
    }

    deleteQuestions(roles) {
        return [
            {
                type: 'list',
                name: 'role',
                message: 'Which role would you like to remove?',
                choices() {
                    const roleToRemove =  roles.map((role) => {return role.title});
                    return roleToRemove;
                } 
            }
        ]
    }

    async add() {
        const availableDepartments = await new DepartmentDAO().getAll();
        const answer = await inquirer.prompt(this.addQuestions(availableDepartments));

        const selectedDepartments = availableDepartments.filter((dept) => {
            return dept.name === answer.department;
        })
        roleDAO.add(answer.title, answer.salary, selectedDepartments.pop().id);
    }

    async getAll() {
        this.roles = await roleDAO.getAll();
        return this.roles;
    }

    async delete() {
        await this.getAll();

        const answer = await inquirer.prompt(this.deleteQuestions(this.roles));
        const roleToDelete = this.roles.filter((role) => {
            return role.title === answer.role;
        });

        roleDAO.delete(roleToDelete.pop());
    }
}

module.exports = RoleApplication;