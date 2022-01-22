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

    loadTasks(tasksDB = []) { // Reads tasks from the data.json file and adds them to _list object
        tasksDB.forEach(task => {
            this._list[task.id] = task;
        });
    };

    createTask(desc = '') { // Creates a task and adds it to the _list object
        const task = new Task(desc);
        this._list[task.id] = task;
    };

};

module.exports = Tasks;