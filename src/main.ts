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

const data = JSON.stringify(out)

// Define payload header
const headers = {
  "Content-Type": "application/json",
  "Authorization": `BEARER ${morpheusToken}`,
}

var orderID = orderCatalogItem(inputName);
delay(15000)

const result = Promise.resolve(orderID);
result.then((orderOutID) => {
  getCatalogItem(orderOutID);
}).catch((err) => {
  console.log(err);
});

async function orderCatalogItem(name: OrderResponse): Promise<number> {
  var apiUrl = morpheusAPI + "/api/catalog/orders"
  const response = await fetch(apiUrl, { method: 'POST', headers: headers, body: data})
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const catalogOrder = await response.json() as OrderResponse
  console.log(catalogOrder)
  console.log(catalogOrder.order.items[0].id)
  return catalogOrder.order.items[0].id
}

async function getCatalogItem(itemID: number) {
  var apiUrl = morpheusAPI + "/api/catalog/items/" + itemID
  await fetch(apiUrl, { method: 'GET', headers: headers})
     .then(resp => resp.json())
     .then(json => console.log(json))
     .catch(error => {
       console.log(error)
     })
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