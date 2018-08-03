const fs = require("fs");
const path = require("path");
const got = require("got");
const FormData = require("form-data");
const { startCamunda } = require("run-camunda/camunda");

const deploy = async (filePath) => {

    // constants
    const DEPLOYMENT_NAME = path.basename(filePath);
    const URL = "http://localhost:8080/engine-rest/deployment/create";

    // create form and deploy
    const form = new FormData();
    form.append("deployment-name", DEPLOYMENT_NAME);
    form.append(DEPLOYMENT_NAME, fs.createReadStream(filePath));
    try {
        await got.post(URL, { body: form });
    } catch (e) {
        throw e.response ? e.response.body.message : e;
    }
};

const startProcess = async (definitionKey) => {

    try {
        await got.post(
            `http://localhost:8080/engine-rest/process-definition/key/${definitionKey}/start`,
            { body: {}, json: true }
        );
    }
    catch (e) {
    }

};

const setup = async () => {

    //// Camunda verion may be not sync with what they are expecting !!!
    ////await startCamunda();

    console.log("deploying process ...");
    await deploy("./Process/test-process.bpmn");
    console.log("process deployed");

    console.log("starting process ...");
    await startProcess("loan_process");
    console.log("process started");
};

setup();