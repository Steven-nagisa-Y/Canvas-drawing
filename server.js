const express = require('express');
const app = new express();
const port = 4040;

app.use(express.static('./'));
app.listen(port, function() {
    console.log("Server running at http://localhost:${port}", port);
    console.log("Ctrl+C to exit.");
});