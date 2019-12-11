const github = require("@actions/github");
const createBody = require("./create-body");

let createIssue = async ({ toolkit, vulnerabilities, numVulnerabilities }) => {
  // const context = toolkit.context;
  const context = github.context;

  return await toolkit.issues.create(
    context.repo({
      title: "Yarn.lock Vulernabilities",
      body: createBody(vulnerabilities, numVulnerabilities)
    })
  );
};

module.exports = createIssue;
