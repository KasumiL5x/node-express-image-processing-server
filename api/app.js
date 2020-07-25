require("express");
require("path");

const app = express();

const pathToIndex = path.resolve(__dirname, "../client/index.html");
app.use("/*", (request, response) => {
	response.sendfile(pathToIndex);
});

module.exports = app;
