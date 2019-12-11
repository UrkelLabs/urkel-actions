const core = require("@actions/core");
const exec = require("@actions/exec");
const github = require("@actions/github");
const runAudit = require("./lib/run-audit");
const createIssue = require("./lib/create-issue");

async function run() {
  let dryRunOutput = "";
  try {
    const options = {};
    options.listeners = {
      stdout: data => {
        dryRunOutput += data.toString();
      }
    };

    await exec.exec(
      "octodns-sync",
      ["--config-file", "./config/production.yml"],
      options
    );

    console.log(dryRunOutput);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();