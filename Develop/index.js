// TODO: Include packages needed for this application
const inq = require('inquirer')
var content
// TODO: Create an array of questions for user input
const userInfo = [
    {
        type: 'input',
        name: 'projectName',
        message: 'What is this README for?',
    },
    {
        type: 'input',
        name: 'author',
        message: 'Who contributed to the project?',
    }];


// TODO: Create a function to write README file
function writeToFile(fileName, data) { }

// TODO: Create a function to initialize app
function init(questions) {
    inq.prompt(
        questions
    )
        .then(answers => {
            content = `# ${answers.projectName}\nby ${answers.author}\n`
            choose()
        })
}

// Function call to initialize app
init(userInfo);

function choose() {
    inq.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What size do you need?',
            choices: ['PageTitle', 'SubTitle', 'Heading', 'SubHeading', 'End'],
            filter: function (val) {
                return val.toLowerCase();
            }
        }
    ]).then(answer => {
        if (answer.choice === "end") {
            console.log('ended')
            console.log(content)
        } else {
            addition(answer.choice)
        }
    }

    )
}
function addition(chosenAnswer) {
    console.log(chosenAnswer)
    let prefix
    if (chosenAnswer == 'pagetitle') {
        prefix = '#'
    } if (chosenAnswer == 'subtitle') {
        prefix = '##'
    } if (chosenAnswer == 'heading') {
        prefix = '###'
    } if (chosenAnswer == 'subheading') {
        prefix = '####'
    }
    inq.prompt([
        {
            type: 'input',
            name: 'title',
            message: `What would you like your ${chosenAnswer} to be called?`
        },
        {
            type: 'input',
            name: 'text',
            message: `Please enter your paragraph below`
        }
    ]).then(function (answers) {


        content += `${prefix} ${answers.title}\n${answers.text}\n`
        choose()
    }

    )
}
//description, installation instructions, usage information, contribution guidelines, and test instructions

