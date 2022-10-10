import {env} from "process";
import fetch from "node-fetch";
import { OrderResponse } from './types';
import {CatalogItemResponse} from './types'
const core = require("@actions/core");
const github = require("@actions/github");
const https = require('https');


// Define the catalog item input parameters
const inputName = core.getInput("name");
const inputParameters = JSON.parse(core.getInput("parameters"));
const morpheusAPI = env.MORPHEUS_API_URL
const morpheusToken = env.MORPHEUS_API_TOKEN
const verifySSL = core.getInput("verify_ssl");

// Verify Morpheus SSL Certificate
const httpsAgent = new https.Agent({
  rejectUnauthorized: verifySSL,
});

// TODO: Add logic to check if user credentials have been provided
// TODO: Add logic to check if the catalog item name exists
// TODO: Add logic to perform a validation call
// TODO: Add a global timeout parameter to avoid indefinite polling

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

const data = JSON.stringify(out)

// Define payload header
const headers = {
  "Content-Type": "application/json",
  "Authorization": `BEARER ${morpheusToken}`,
}

const orderID = orderCatalogItem(inputName);
const result = Promise.resolve(orderID);
result.then((value) => {
  pollingWrapper(value)
}).catch((err) => {
  console.log(err);
});

// orderCatalogItem submits a POST request to order a Morpheus catalog item
async function orderCatalogItem(name: OrderResponse): Promise<number> {
  console.log("Ordering catalog item")
  var apiUrl = morpheusAPI + "/api/catalog/orders"
  const response = await fetch(apiUrl, { method: 'POST', headers: headers, body: data})
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const catalogOrder = await response.json() as OrderResponse
  await new Promise(done => setTimeout(done, 30000));  
  console.log(catalogOrder)
  console.log(catalogOrder.order.items[0].id)
  return catalogOrder.order.items[0].id
}

async function pollingWrapper(itemID: number){
  console.log("Polling api...")
  let currentData = "provisioning"
  let timeoutPeriod = 0
  while (currentData == "provisioning") {
    console.log("fetching current status...")
    const output = await getCatalogItem(itemID)
    await new Promise(done => setTimeout(done, 30000));  
    currentData = output
    console.log(currentData)
    timeoutPeriod = timeoutPeriod + 1
    console.log(timeoutPeriod)
  }
}

async function getCatalogItem(itemID: number): Promise<string> {
  var apiUrl = morpheusAPI + "/api/catalog/items/" + itemID
  const itemResponse = await fetch(apiUrl, { method: 'GET', headers: headers})
  if (!itemResponse.ok) {
    const message = `An error has occured: ${itemResponse.status}`;
    throw new Error(message);
  }
  const itemOutput = await itemResponse.json() as CatalogItemResponse
  console.log(itemOutput)
  return itemOutput.item.instance.status
}