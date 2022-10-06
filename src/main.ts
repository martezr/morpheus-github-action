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

interface Payload {
  order: {
    items: Array<{
      type: {
        name: string
      }
      config: {}
    }>
  };
}

const obj = {} as Payload;

obj.order.items[0].type.name = inputName;

console.log(inputParameters)
const map = new Map(Object.entries(inputParameters))
//inputParameters.forEach(function(value: string, key: string) {
//  obj.order.items[0].config.
//  obj.order.items[0].config.key = value
//})
obj.order.items[0].config = map

console.log(JSON.stringify(obj))

const data = JSON.stringify(obj)

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

