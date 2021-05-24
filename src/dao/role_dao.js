const {save, get, remove} = require('./dao');

class RoleDAO {
    async add(title, salary, departmentID) {
        const successful = await save('INSERT INTO role SET ?', {
            title,
            salary,
            "department_id": departmentID
        });
    }

    async getAll() {
        return await get('SELECT * from role');
    }

    async delete(role) {
        const rowsAffected = await remove('DELETE from role where ?', {
            id: role.id
        });
    }
}

module.exports = RoleDAO;