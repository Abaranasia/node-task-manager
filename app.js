require('colors');

const { saveDB, readDB } = require('./helpers/fileTools');
//const { showMenu, pause } = require('./helpers/messages');
const {
    inquirerMenu,
    pause,
    readInput,
    deleteTaskList,
    confirm
} = require('./helpers/inquirer');
const Task = require('./models/Task');
const Tasks = require('./models/Tasks');


const main = async () => {
    let opt;
    const tasks = new Tasks();

    const tasksDB = readDB();

    if (tasksDB) {
        tasks.loadTasks(tasksDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await readInput('Description:');
                tasks.createTask(desc);
                console.log(desc);
                break;
            case '2':
                tasks.allTasks();

                break;
            case '3':
                tasks.statusList(true)
                break;
            case '4':
                tasks.statusList(false)
                break;
            case '5':

                break;
            case '6':
                const deleteId = await deleteTaskList(tasks.listArray);
                const ok = await confirm('Are you sure to delete this task?');
                if (ok) {
                    tasks.deleteTask(deleteId)
                    console.log(`${deleteId} has been deleted`);
                }
                break;

            default:
                break;
        }

        // saveDB(tasks.listArray);
        await pause();

    } while (opt !== '0')
}

main();