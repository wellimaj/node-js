function getNameFromCommandLine() {
  const process = require("process");
  // Write you code here, name should be taken as args in process.argv
  const args = process.argv;
  return args[args.length - 1];
}

function getNameFromEnv() {
  // Write your code here
  process.env.name = "Yash";
  return process.env.name;
}

function getNameFromReadLine() {
  var readline = require("readline");

  var rl = readline.createInterface(process.stdin, process.stdout);
  rl.question("What is your name? ", (name) => {
    console.log(name);
  });
  // Write your code here
}
getNameFromEnv();

module.exports = {
  getNameFromCommandLine,
  getNameFromEnv,
  getNameFromReadLine,
};
