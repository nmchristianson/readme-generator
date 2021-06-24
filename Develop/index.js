// TODO: Include packages needed for this application

// TODO: Create an array of questions for user input
//const questions = [];
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

function questionsPrompt() {
    return inquirer.prompt([
    {
        type: "input",
        name: "questions",
        message: "Type in your gitHub username."
    },
    {
        type: "input",
        name: "repo",
        message: "Which repository is this for?"
    },
    {
        type: "input",
        name: "title",
        message: "What is the title of your project?"
    },
    {
        type: "input",
        name: "description",
        message: "Write a brief description of your application."
    },
    {
        type: "input",
        name: "install",
        message: "Describe the installation process for this application."
    },
    {
        type: "input",
        name: "usage",
        message: "Describe the usage of you application."
    },
    {
        type: "input",
        name: "license",
        message: "Provide any license information"
    },
    {
        type: "input",
        name: "contributors",
        message: "List the contributors for this application."
    },
    {
        type: "input",
        name: "test",
        message: "Describe tests run for this application."
    }
])};

// TODO: Create a function to write README file
//function writeToFile(fileName, data) {}
function writeToFile(fileName, data) {
    const readMeInfo = `# ${data.title}
## Description
${data.description}
## Table of Contents
- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contributors](#Contributors)
- [Tests](#Tests)
- [Questions](#Questions)
## Installation
${data.install}
## Usage
${data.usage}
## License
${data.license}
## Contributors
${data.contributors}
## Tests
${data.test}
## Questions
GitHub Username: ${data.questions}
\n`;

        fs.writeFile(fileName, readMeInfo, function(error){
            if(error) {
                throw error;
            } 
            console.log("Your ReadMe is complete!");
        });
}

function appendToFile (username) {
    const queryURL = `https://api.github.com/users/${username}`;

    axios.get(queryURL).then(function(response){
        //console.log(response);
        const avatar = `\n![github avatar](${response.data.avatar_url})\n`;

        fs.appendFile("README.md", avatar, function(error){
            if(error) {
                throw error;
            }
        });

        const followerBadge = `https://img.shields.io/github/followers/${username}?color=blue&style=social`;
        const addBadge = `\n![github follower badge](${followerBadge})\n`;

        fs.appendFile("README.md", addBadge, function(error){
            if(error) {
                throw error;
            }
        });
    });
}
// TODO: Create a function to initialize app
//function init() {}
async function init() {
    const questions = await questionsPrompt();

    writeToFile("README.md", questions);

    appendToFile(questions.questions);
}
// Function call to initialize app
init();
