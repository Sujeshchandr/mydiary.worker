const { Client, logger } = require('camunda-external-task-client-js');

const fs = require("fs");
const path = require("path");
const got = require("got");
const FormData = require("form-data");
const { startCamunda } = require("run-camunda/camunda");

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: 'http://aira.frontiers-int1.info/engine-rest', use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

////Polling tasks from the engine works by performing a fetch & lock operation of tasks that have subscriptions.It then calls the handler registered to each task.
////Polling is done periodically based on the interval configuration.

// susbscribe to the topic: 'charge-card'
client.subscribe('JOB_QC_5_2', async function({ task, taskService }) {
  // Put your business logic here

  // Get a process variable
  const amount = task.variables.get('amount');
  const item = task.variables.get('item');

  console.log(`TASK 1`);

  console.log(`Charging credit card with an amount of ${amount}€ for the item '${item}'...`);

  // Unlocks an external task by id. Clears the task’s lock expiration time and worker id.
  //await taskService.unlock(task);

  //// Complete the task
  //await taskService.complete(task);
});

client.subscribe('TOPIC-TASK-2', async function ({ task, taskService }) {
    // Put your business logic here

    // Get a process variable
    const amount = task.variables.get('amount');
    const item = task.variables.get('item');

    console.log(`TASK 2`);
    console.log(`Charging credit card with an amount of ${amount}€ for the item '${item}'...`);

    // Complete the task
    await taskService.complete(task);
});

