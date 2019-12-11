const { Toolkit } = require('actions-toolkit')
const createBody = require("./create-body");

function createList(vulnerabilities) {
  return Object.keys(vulnerabilities)
    .map(key => `* ${key}: ${vulnerabilities[key]}`)
    .join("\n");
}

/**
 * @param {Object} param0
 * @param {import('actions-toolkit').Toolkit} param0.tools
 */
let createPR = async ({ toolkit, vulnerabilities, numVulnerabilities }) => {
// const tools = new Toolkit()
    const context = toolkit.context;
  const newBranch = `audit-fixer-${context.sha.slice(0, 7)}`;

  try {
    await toolkit.git.createRef(
        ...context.repo,
        ref: "refs/heads/" + newBranch,
        sha: context.sha
    );
  } catch (err) {
    // Throw unless the ref already exists
    if (err.status !== 422) throw err;
  }

  const tree = await toolkit.git.getTree(
    context.repo({ tree_sha: context.sha })
  );
  const newPackageLockContents = tools.getFile("yarn.lock", "base64");

  await toolkit.repos.updateFile(
    context.repo({
      path: "yarn.lock",
      sha: tree.data.tree.find(
        item => item.path === "yarn.lock" && item.type === "blob"
      ).sha,
      message: `Fix ${numVulnerabilities} yarn vulnerabilities\n${createList(
        vulnerabilities
      )}`,
      content: newPackageLockContents,
      branch: newBranch
    })
  );

  return toolkit.pullRequests.create(
    context.repo({
      title: `Automatic audit of yarn vulnerabilities (${numVulnerabilities} fixed)`,
      base: "master",
      head: newBranch,
      body: createBody(vulnerabilities, numVulnerabilities)
    })
  );
};

module.exports = createPR;
