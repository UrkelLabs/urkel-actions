const dedent = require("dedent");

module.exports = (vulnerabilities, total) => {
  return dedent`### \`yarn audit\`
  A total of **${total} vulnerabilities** have been found.

  | Severity | Count |
  | --- | --- |
  ${Object.keys(vulnerabilities)
    .map(key => `| ${key} | ${vulnerabilities[key]} |`)
    .join("\n")}
  ---
  ###### These vulnerabilities were found by running [\`yarn audit\`](https://yarnpkg.com/lang/en/docs/cli/audit/) in the root directory of your repository.
  `;
};
