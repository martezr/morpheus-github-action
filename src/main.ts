import {env} from "process";
import fetch from "node-fetch";
const core = require("@actions/core");
const github = require("@actions/github");

const inputName = core.getInput("name");
const inputParameters = core.getInput("parameters");
const morpheusAPI = env.MORPHEUS_API_URL
const morpheusToken = env.MORPHEUS_API_TOKEN
const headers = {
  "Content-Type": "application/json",
  "Authorization": `BEARER ${morpheusToken}`,
}

var output: any = {};
output["order"].items = [];

var itemPayload: any = {};
itemPayload["type"].name = "test"
itemPayload["config"] = {};

console.log(inputParameters)
inputParameters.forEach(function(value: string, key: string) {
  itemPayload["config"][key] = value
})

output["order"].items.push(itemPayload)
console.log(JSON.stringify(output))

const data = JSON.stringify(output)

orderCatalogItem(inputName);

function orderCatalogItem(name: string) {
  console.log(`'Hello ${name}! You are running a GH Action'`);
  var apiUrl = morpheusAPI + "/api/catalog/orders"
  fetch(apiUrl, { method: 'POST', headers: headers, body: data})
     .then(resp => resp.json())
     .then(json => console.log(json))
     .catch(error => {
       console.log(error)
     })
}

