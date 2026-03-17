require("dotenv").config();
const app = require('./src/app');
const connectToDB = require('./src/config/database');

connectToDB();

app.listen(process.env.RUNNING_PORT, () => {
    console.log('Server running on port ' + process.env.RUNNING_PORT);
});