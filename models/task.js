const db = require('./db.js');
const config = require('../config');
const fs = require('fs');

class Task {
    static async init() {
        if (config.db.cleanOnStartup) {
            await db.execute('DROP TABLE IF EXISTS `tasks`');
        }

        await db.execute(`CREATE TABLE IF NOT EXISTS tasks (
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            description TEXT NOT NULL,
            completed TINYINT NOT NULL DEFAULT 0,
            PRIMARY KEY (id),
            UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);`);
        
        if (config.db.loadMockupData) {
            const mockups = JSON.parse(fs.readFileSync('./models/mockups/tasks.json', 'utf8'));
            mockups.forEach(async (mockup) => {
                await Task.createTask(mockup);
            })
        }

        console.log('Tasks table initialised');
    }

    static async getTasks() {
        const tasks = await db.query('SELECT * FROM tasks');
        return tasks;
    }

    static async createTask(task) {
        const newTask = await db.query('INSERT INTO tasks(description, completed) VALUES (?, ?)', [task.description, task.completed=="true"?1:0]);
        return newTask;
    }

    static async updateTask(taskId, task) {
        const res = await db.query('UPDATE tasks SET description = ? WHERE id = ?', [task.description, taskId]);
        return res;
    }

    static async completeTask(taskId, task) {
        const res = await db.query('UPDATE tasks SET completed = ? WHERE id = ?', [task.completed=="true"?1:0, taskId]);
        return res;
    }

    static async deleteTask(taskId) {
        const res = await db.query('DELETE FROM tasks WHERE id = ?', [taskId]);
        return res;
    }

}

module.exports = Task;
