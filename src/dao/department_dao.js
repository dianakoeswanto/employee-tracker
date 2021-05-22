const {save, get, remove} = require('./dao');

class DepartmentDAO {
    async add(name) {
        const successful = await save('INSERT INTO department SET ?', {
            name: name
        });

        console.log(successful.affectedRows);
    }

    async getAll() {
        return await get('SELECT * from department');
    }

    async delete(department) {
        console.log(`Dept id: ${JSON.stringify(department)}`);
        const rowsAffected = await remove('DELETE from department where ?', {
            id: department.id
        });

        console.log(rowsAffected.affectedRows);
    }
}

module.exports = DepartmentDAO;