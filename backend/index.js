const server = require("./api/server");

const { PORT } = require("./config");
server.use("*", (req, res) => {
	res.status(500).json({
		message: "Something Went wrong in the Server",
	});
});

server.listen(PORT || 5000, () => {
	console.log(`listen on ${PORT}`);
});
