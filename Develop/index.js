// TODO: Include packages needed for this application
const inq = require('inquirer')
const fs = require('fs')
var content
var project = ''
var license
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
    },
    {
        type: 'list',
        name: 'license',
        message: 'Plesae select your desired License',
        choices: ['none', 'MIT', 'Apache', 'BSD', 'GPL']
    }];
const licenses = {
    Apache: '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
    MIT: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
    BSD: '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
    GPL: '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
}

const prefixes = {
    pagetitle: '#',
    subtitle: '##',
    heading: '###',
    subheading: '####'
}

// TODO: Create a function to initialize app
function init(questions) {
    inq.prompt(
        questions
    )
        .then(function (answers) {
            chosenLicense = answers.license
            license = licenses[chosenLicense]
            project = answers.projectName
            project = project.replace(/\s+/g, '')

            content = `# ${answers.projectName}\n${license}\n`
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
            console.log(chosenLicense)
            content += `## Licenses\nThis repository is licensed under the ${chosenLicense} license`
            writeToFile(project, content)
        } else {
            addition(answer.choice)
        }
    }
    )
}
function addition(chosenAnswer) {
    console.log(chosenAnswer)
    let prefix = prefixes[chosenAnswer]
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

// TODO: Create a function to write README file
function writeToFile(name, data) {
    fs.writeFile(name + '.md', data, function (err) {
        if (err) throw err;
        console.log('Saved!');
    })
}