// const { Toolkit } = require('actions-toolkit')
const core = require("@actions/core");
const github = require("@actions/github");
const runAudit = require("./lib/run-audit");
const runAuditFix = require("./lib/run-audit-fix");
const createPR = require("./lib/create-pr");

// const tools = new Toolkit()

async function run() {
  try {
    let { vulnerabilities, numVulnerabilities } = await runAudit();
    if (numVulnerabilities === 0) {
      console.log("No vulnerabilities found!");
      return;
    }

    const fixResult = await runAuditFix();
    console.log(fixResult);

    const githubToken = core.getInput("GITHUB_TOKEN");

    const toolkit = new github.GitHub(githubToken);

    await createPR({ toolkit, vulnerabilities, numVulnerabilities });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

// .then(async ({ vulnerabilities, numVulnerabilities }) => {

//   return createPR({
//     vulnerabilities,
//     numVulnerabilities,
//     tools
//   })
// })
// .catch(err => {
//   console.error(err)
//   process.exit(1)
// })
