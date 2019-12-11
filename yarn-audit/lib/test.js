#!/usr/bin/env node
// const { exec } = require("child_process");
const { execSync } = require("child_process");

const result = execSync("yarn audit --json").toString();

console.log(result);

let data = result.split("\n");

console.log("DATA:");
console.log(data);

let summary2 = data.filter(str => {
  if (str.includes("auditSummary")) {
    return JSON.parse(str);
  }
});
console.log("SUMMARY:");
console.log(summary2);
console.log("JSON");
console.log(summary2[0]);

let summary = JSON.parse(summary2[0]);

// let summary = JSON.parse(data[data.length - 2]);

console.log(summary.data);

// console.log(result.stdout);
