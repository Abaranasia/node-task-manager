require('colors');

const { saveDB, readDB } = require('./helpers/fileTools');
//const { showMenu, pause } = require('./helpers/messages');
const {
    inquirerMenu,
    pause,
    readInput
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
                console.log(tasks.listArray);
                break;

            default:
                break;
        }

        // saveDB(tasks.listArray);
        await pause();

    } while (opt !== '0')
}

main();