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

console.log(inputParameters)
//let jsonObject = {};  
let map = new Map<string, string>()  

inputParameters.forEach(function(value: any, key: any) {
  map.set(key, value)
 // jsonObject[key] = value
})

console.log(map)
var out = {
  "order": {
       "items": [
            {
                 "type": {
                      "name": inputName
                 },
                 "config": map
            }
       ]
  }
}

console.log(JSON.stringify(out))

const data = JSON.stringify(out)

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

