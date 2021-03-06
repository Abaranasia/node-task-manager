const inquirer = require('inquirer');
require('colors');

const menuOptions = [  //Menu for consoleoptions
    {
        type: 'list',
        name: 'option',
        message: 'select an option',
        choices: [
            {
                value: '1',
                name: `${'1.'.yellow} Create task`
            },
            {
                value: '2',
                name: `${'2.'.yellow} List tasks`
            },
            {
                value: '3',
                name: `${'3.'.yellow} List completed tasks`
            },
            {
                value: '4',
                name: `${'4.'.yellow} List pending tasks`
            },
            {
                value: '5',
                name: `${'5.'.yellow} Complete task`
            },
            {
                value: '6',
                name: `${'6.'.yellow} Delete task`
            },
            {
                value: '0',
                name: `${'0.'.yellow} Exit`
            },
        ]
    }
]

const inquirerMenu = async () => {
    console.clear();
    console.log('================================'.green);
    console.log('        SELECT AN OPTION        '.yellow);
    console.log('================================\n'.green);

    const { option } = await inquirer.prompt(menuOptions);
    return option;
};

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPress ${'enter'.yellow} to continue\n`,
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
};

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Please enter a value';
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
};

const deleteTaskList = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}. `.green;

        return {
            value: task.id,
            name: `${idx} ${task.desc}`
        };
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'delete',
            choices
        }
    ]
    const { id } = await inquirer.prompt(questions);
    console.log("deleteId", id);
    return id;
};

const checkingTasks = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = `${i + 1}. `.green;

        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: (task.completed) ? true : false
        };
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'select',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(questions);
    return ids;
};


const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok
};

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    deleteTaskList,
    checkingTasks,
    confirm
}