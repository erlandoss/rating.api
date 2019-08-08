const app = require("./app");
const Db = require("./db");

const port = process.env.PORT || 8080;

Db.addTestData();
app.listen(port, () => {
    console.log('Started NodeJS server on port ' + port);
});

