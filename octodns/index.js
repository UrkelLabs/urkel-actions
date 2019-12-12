const core = require("@actions/core");
const exec = require("@actions/exec");
const github = require("@actions/github");

async function dryRun() {
  let dryRunOutput = "";
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

  const token = core.getInput("token");

  const context = github.context;
  if (context.payload.pull_request == null) {
    core.setFailed("No pull request found.");
    return;
  }
  const pull_request_number = context.payload.pull_request.number;

  const octokit = new github.GitHub(token);
  const new_comment = octokit.issues.createComment({
    ...context.repo,
    issue_number: pull_request_number,
    body: result
  });
}

async function deploy() {
  await exec.exec("octodns-sync", [
    "--config-file",
    "./config/production.yml",
    "--doit"
  ]);
}

async function run() {
  try {
    const sync = core.getInput("sync");

    if (sync === "deploy") {
      await deploy();
    } else {
      await dryRun();
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
