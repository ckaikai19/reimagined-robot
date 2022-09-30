const express = require("express");
const connection = require("./config/connection");
const routes = require("./routes/user")
const app = express();
const port = process.env.PORT || 5001;
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);

// connection.connect(function (err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }

//   app.listen(port, () => console.log(`Listening on port ${port}`));
// });


app.listen(port, () => console.log(`Listening on port ${port}`));