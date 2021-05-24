const {save, get, remove} = require('./dao');

class DepartmentDAO {
    async add(name) {
        const successful = await save('INSERT INTO department SET ?', {
            name: name
        });
    }

    async getAll() {
        return await get('SELECT * from department');
    }

    async delete(department) {
        const rowsAffected = await remove('DELETE from department where ?', {
            id: department.id
        });
    }

    async viewBudgetByDepartment(departmentName) {
        return await get(`select DISTINCT(department), 
                                    SUM(salary) over (partition by department) as total
                          FROM employee_by_manager
                          WHERE ?`, { department: departmentName });
    }
}

module.exports = DepartmentDAO;