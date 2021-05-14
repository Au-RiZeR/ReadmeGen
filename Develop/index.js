// TODO: Include packages needed for this application
const inq = require('inquirer')
const fs = require('fs')
var content
var project = ''
var license
var author
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
    text: '####'
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
            author = answers.author

            content = `# ${answers.projectName}\n${license}\n`
            fs.writeFile(project + '.md', content, function (err) {
                if (err) throw err;
                console.log('Saved!');
            })
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
            choices: ['Text', 'PageTitle', 'SubTitle', 'Heading', 'End'],
            filter: function (val) {
                return val.toLowerCase();
            }
        }
    ]).then(answer => {
        if (answer.choice === "end") {
            content = `## Author/s and Acknowledgements\n${author}\n## Licenses\nThis repository is licensed under the ${chosenLicense} license`
            fs.appendFile(project + '.md', content, function (err) {
                if (err) throw err;
                console.log('Saved!');
            })
        } else {
            addition(answer.choice)
        }
    }
    )
}
function addition(chosenAnswer) {
    let prefix = prefixes[chosenAnswer]
    inq.prompt([
        {
            type: 'input',
            name: 'title',
            message: `What would you like your ${chosenAnswer} to be say?`
        }
    ]).then(function (answers) {


        content = `${prefix} ${answers.title}\n`
        fs.appendFile(project + '.md', content, function (err) {
            if (err) throw err;
            console.log('Saved!');
        })
        choose()
    }

    )
}
//description, installation instructions, usage information, contribution guidelines, and test instructions

// TODO: Create a function to write README file
// function writeToFile(name, data) {
//     fs.writeFile(name + '.md', data, function (err) {
//         if (err) throw err;
//         console.log('Saved!');
//     })
// }