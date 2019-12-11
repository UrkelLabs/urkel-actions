const exec = require("@actions/exec");

let runAudit = async () => {
  let auditOutput = "";

  try {
    const options = {};
    options.listeners = {
      stdout: data => {
        auditOutput += data.toString();
      }
    };

    await exec.exec("yarn", ["audit", "--json"], options);
  } catch (error) {
    //Do nothing. Yarn audit will fail if there is a vulnerability found for some reason.
  }

  try {
    // const result = await exec.exec("yarn", ["audit", "--json"]);
    // Try to parse the result as actual JSON
    // const summary = JSON.parse(result.stdout.pop());
    const data = auditOutput.split("\n");

    const summary = data.filter(str => {
      if (str.includes("auditSummary")) {
        return JSON.parse(str);
      }
    });
    // const summary = JSON.parse(data[data.length - 2]);
    // const json = JSON.parse(result.stdout);
    // const vulns = json.metadata.vulnerabilities
    const summaryJSON = JSON.parse(summary[0]);
    const vulns = summaryJSON.data.vulnerabilities;

    // Get the total count of vulnerabilities
    const keys = Object.keys(vulns);
    const numVulnerabilities = keys.reduce((p, c) => {
      p += vulns[c];
      return p;
    }, 0);
    return { vulnerabilities: vulns, numVulnerabilities };
  } catch (err) {
    throw err;
  }
};

module.exports = runAudit;
