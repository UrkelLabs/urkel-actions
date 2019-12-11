const exec = require("@actions/exec");

let runAuditFix = async () => {
  const args = ["audit", "fix", "--force"];

  // if (process.env.DRY_RUN) args.push('--dry-run', '--json')

  const result = await exec.exec("yarn", args);

  if (result.exitCode && result.exitCode !== 0) {
    const error = result.stderr;
    throw new Error(error);
  }

  return result;
};

module.exports = runAuditFix;
