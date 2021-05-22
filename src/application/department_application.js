const inquirer = require("inquirer");
const DepartmentDAO = require("../dao/department_dao");

const departmentDAO = new DepartmentDAO();

class DepartmentApplication {
    constructor() {
        this.departments = [];
    }

    static addQuestions() {
        return [
                {
                    type: 'input',
                    name: 'name',
                    message: `What is the department's name?`,
                    validate: (input) => {
                        return input ? true : "Please enter a valid name";
                    },
                }
            ]
    }

    static deleteQuestions(departments) {
        return [
            {
                type: 'list',
                name: 'name',
                message: 'Which department would you like to remove?',
                choices() {
                    const deptToRemove =  departments.map((dpt) => {return dpt.name});
                    return deptToRemove;
                } 
            }
        ];
    }

    async add() {
        const answer = await inquirer.prompt(DepartmentApplication.addQuestions());
        departmentDAO.add(answer.name);
    }

    async getAll() {
        this.departments = await departmentDAO.getAll();
        return this.departments;
    }

    async delete() {
        await this.getAll();

        const answer = await inquirer.prompt(DepartmentApplication.deleteQuestions(this.departments));
        const departmentToDelete = this.departments.filter((dpt) => {
            return dpt.name === answer.name;
        });

        departmentDAO.delete(departmentToDelete.pop());
    }
}

module.exports = DepartmentApplication;