const core = require("@actions/core");
const github = require("@actions/github");

const inputName = core.getInput("name");

greet(inputName);

function greet(name: string) {
  console.log(`'Hello ${name}! You are running a GH Action'`);
}
