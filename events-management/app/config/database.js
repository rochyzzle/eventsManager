require("dotenv").config();

//Set up mongoose connection
const mongoose = require("mongoose");
const nodeEnv = process.env.NODE_ENV;
console.log("Node Env", nodeEnv);
const mongoDB =
  nodeEnv === "production" ? process.env.MONGODB_URI : process.env.MONGO_URL;
console.log("Mongo URL", mongoDB);
mongoose.set("useFindAndModify", false);
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

module.exports = mongoose;
