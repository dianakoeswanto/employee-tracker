const {get, save, remove} = require('./dao');

class EmployeeDAO {
    async add(firstname, lastname, roleId, managerId) {
        const query = 'INSERT INTO employee SET ?';
        const params = {
            first_name: firstname,
            last_name: lastname,
            role_id: roleId,
            manager_id: managerId ? managerId : null
        }

        await save(query, params);
    }

    async getAll() {
        return await get("select * from employee_by_manager order by id");
    }

    async getManagers() {
        return await get(`SELECT DISTINCT(e.manager_id) as id, m.first_name, m.last_name 
        FROM employee e
        INNER JOIN employee m
        ON e.manager_id = m.id`);
    }

    async getByManager(managerId) {
        return await get("select * from employee_by_manager where ? order by id", {
            manager_id: managerId
        });
    }

    async delete(employeeId) {
        return await remove("delete from employee where ?", 
        {
            id: Number(employeeId)
        });
    }

    async updateManager(employeeToUpdateId, newManagerId) {
        return await save('UPDATE employee SET ? WHERE ?', 
        [
            {
                manager_id: Number(newManagerId),
            },
            {
                id: Number(employeeToUpdateId)
            }
        ])
    }

    async updateRole(employeeToUpdateId, newRoleId) {
        return await save('UPDATE employee SET ? WHERE ?', 
        [
            {
                role_id: Number(newRoleId),
            },
            {
                id: Number(employeeToUpdateId)
            }
        ])
    }

}

module.exports = EmployeeDAO;