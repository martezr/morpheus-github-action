import {env} from "process";
import fetch from "node-fetch";
import { OrderResponse } from './types';
const core = require("@actions/core");
const github = require("@actions/github");

// Define the catalog item input parameters
const inputName = core.getInput("name");
const inputParameters = JSON.parse(core.getInput("parameters"));
const morpheusAPI = env.MORPHEUS_API_URL
const morpheusToken = env.MORPHEUS_API_TOKEN

// Define the request payload
var out = {
  "order": {
       "items": [
            {
                 "type": {
                      "name": inputName
                 },
                 "config": inputParameters
            }
       ]
  }
}

console.log(JSON.stringify(out))
const data = JSON.stringify(out)

// Define payload header
const headers = {
  "Content-Type": "application/json",
  "Authorization": `BEARER ${morpheusToken}`,
}

orderCatalogItem(inputName);

async function orderCatalogItem(name: OrderResponse) {
  var apiUrl = morpheusAPI + "/api/catalog/orders"
  const response = await fetch(apiUrl, { method: 'POST', headers: headers, body: data})
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const catalogOrder = await response.json() as OrderResponse
  console.log(catalogOrder)
  console.log(catalogOrder.order.items[0].id)
}

function getCatalogItem(itemID: number) {
  var apiUrl = morpheusAPI + "/api/catalog/orders/" + itemID
  fetch(apiUrl, { method: 'GET', headers: headers})
     .then(resp => resp.json())
     .then(json => console.log(json))
     .catch(error => {
       console.log(error)
     })
}