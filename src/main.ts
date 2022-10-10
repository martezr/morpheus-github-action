import {env} from "process";
import fetch from "node-fetch";
import { OrderResponse } from './types';
import {CatalogItemResponse} from './types'
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
  console.log(itemOutput.item.instance.status)
  return itemOutput.item.instance.status
}

function delay(milliseconds : number) {
  return new Promise(resolve => setTimeout( resolve, milliseconds));
}

function getActualId(): Promise<number> {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(Math.floor(Math.random() * 100));
      }, 100);
  });
}

async function getId(orderID: Promise<number>) {
  const result = await Promise.resolve(orderID);
  const greeting: number = result;

  return greeting;
}