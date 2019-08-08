const app = require("./app");
const rep = require("./repository");

const port = process.env.PORT || 8080;

rep.addTestUsers();
app.listen(port, () => {
    console.log('Started NodeJS server on port ' + port);
});

