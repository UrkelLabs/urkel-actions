// const { Toolkit } = require('actions-toolkit')
const core = require("@actions/core");
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
  } catch (error) {
    core.setFailed(error.message);
  }
}

// .then(async ({ vulnerabilities, numVulnerabilities }) => {
//   if (numVulnerabilities === 0) {
//     console.log('No vulnerabilities found!')
//     return
//   }

//   const fixResult = await runAuditFix(tools)
//   console.log(fixResult)

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
