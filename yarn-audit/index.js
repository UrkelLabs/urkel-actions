// const { Toolkit } = require('actions-toolkit')
const core = require("@actions/core");
const github = require("@actions/github");
const runAudit = require("./lib/run-audit");
const createIssue = require("./lib/create-issue");
// const runAuditFix = require("./lib/run-audit-fix");
// const createPR = require("./lib/create-pr");

// const tools = new Toolkit()

async function run() {
  try {
    let { vulnerabilities, numVulnerabilities } = await runAudit();
    if (numVulnerabilities === 0) {
      console.log("No vulnerabilities found!");
      return;
    }

    // See: https://github.com/UrkelLabs/urkel-actions/issues/9
    // const fixResult = await runAuditFix();
    // console.log(fixResult);

    const githubToken = core.getInput("GITHUB_TOKEN");

    const toolkit = new github.GitHub(githubToken);

    // See https://github.com/UrkelLabs/urkel-actions/issues/9
    // await createPR({ toolkit, vulnerabilities, numVulnerabilities });

    await createIssue({ toolkit, vulnerabilities, numVulnerabilities });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
