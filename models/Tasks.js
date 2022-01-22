const Task = require("./Task");

class Tasks {

    _list = {};

    constructor() {
        this._list = {};
    }

    get listArray() { // Presents the _list object in array format indexed by the ids
        const list = [];
        Object.keys(this._list).forEach(key => {
            const task = this._list[key];
            list.push(task);
        })
        return list;
    };

    createTask(desc = '') { // Creates a task and adds it to the _list object
        const task = new Task(desc);
        this._list[task.id] = task;
    };

    loadTasks(tasksDB = []) { // Reads tasks from the data.json file and adds them to _list object
        tasksDB.forEach(task => {
            this._list[task.id] = task;
        });
    };

    allTasks() { // List task states  -  1. Task :: Completed | Pending
        this.listArray.forEach((task, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completed } = task;
            const status = (completed)
                ? 'Completed'.green
                : 'Pending'.red;
            console.log(`${idx} ${desc} :: ${status}`);
        });
    };

    statusList(completed = true) {
        const list = this.listArray.filter((task) => {
            return ((!!task.completed) === completed)
        });
        list.forEach((task, i) => {
            console.log(`${i + 1}. ${task.desc} ${!!task.completed ? ':: ' + task.completed : ''}`);
        })
    };

    deleteTask(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

};

module.exports = Tasks;