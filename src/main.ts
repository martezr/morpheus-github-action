import {env} from "process";
import fetch from "node-fetch";
const core = require("@actions/core");
const github = require("@actions/github");

const inputName = core.getInput("name");
const morpheusAPI = env.MORPHEUS_API_URL
const morpheusToken = env.MORPHEUS_API_TOKEN

greet(inputName);

function greet(name: string) {
  console.log(`'Hello ${name}! You are running a GH Action'`);
  
  var apiUrl = morpheusAPI + "/api/ping"
  fetch(apiUrl, {
    headers: {Authorization: `BEARER ${morpheusToken}`}
  })
     .then(resp => resp.json())
     .then(json => console.log(json))
}
