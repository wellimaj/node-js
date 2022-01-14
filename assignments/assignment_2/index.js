var fs = require("fs");
fs.writeFileSync(
  "./node-js/assignments/assignment_2/index.html",
  "<h1>Hello World</h1>",
  (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
      console.log(fs.readFileSync("books.txt", "utf8"));
    }
  }
);
const http = require("http");
const newFile = fs.readFileSync(
  "./node-js/assignments/assignment_2/index.html",
  (err, data) => {
    if (err) console.log(err);
    console.log(data);
  }
);
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(newFile);
    res.end();
  }
});
server.listen(3000, "localhost");
