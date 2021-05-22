const Employee = require('../entity/employee');
const {get} = require('./dao');

class EmployeeDAO {
    constructor(employee) {
        this.employee = employee;
    }

    add() {
        console.log('Inserting a new employee...\n');
        const query = connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: this.employee.first_name,
                last_name: this.employee.last_name,
                role_id: this.employee.role.id,
                manager_id: this.employee.manager ? this.employee.manager.id : null
            },
            (err, res) => {
                if (err) throw err;
                console.log(`${res.affectedRows} employee inserted!\n`);
            }
        );

        // logs the actual query being run
        console.log(query.sql);
    }

    static async getManagers() {
        const managers = await get("select * from employee where manager_id is null");
        return managers.map((manager) => {
            return new Employee(manager.id, manager.first_name, manager.last_name);
        })
    }

    delete() {
        
    }
}

module.exports = EmployeeDAO;