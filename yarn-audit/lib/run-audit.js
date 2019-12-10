module.exports = async tools => {
  const result = await tools.runInWorkspace("yarn", ["audit", "--json"], {
    reject: false
  });

  try {
    // Try to parse the result as actual JSON
    // const summary = JSON.parse(result.stdout.pop());
    const data = result.stdout.split("\n");

    const summary = data.filter(str => {
      if (str.includes("auditSummary")) {
        return JSON.parse(str);
      }
    });
    // const summary = JSON.parse(data[data.length - 2]);
    // const json = JSON.parse(result.stdout);
    // const vulns = json.metadata.vulnerabilities
    const vulns = summary[0].data.vulnerabilities;

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
