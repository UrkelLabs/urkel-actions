const core = require("@actions/core");
const exec = require("@actions/exec");
const github = require("@actions/github");

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

    const result = dryRunOutput
      .split(
        "********************************************************************************"
      )
      .pop();

    // console.log(dryRunOutput);
    console.log("RESULT:");
    console.log(result);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
