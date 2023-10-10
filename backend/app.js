import express from "express";
import connectDB from "./db/connectDB.js";
import cors from "cors";
import bodyParser from "body-parser";
import web from "./routes/web.js";
import twilio from "twilio";
import siteController from "./controllers/siteController.js";
const app = express();
const port = 4000;
const DATABASE_URL = "mongodb://127.0.0.1:27017";

// Initialize Twilio client
const accountSid = "AC83e6b4006afa4a88aa1e6fee7f4ad9aa";
const authToken = "9f0c3f01ffaec26b500523e3dddb2a64";
const client = new twilio.Twilio(accountSid, authToken);

// call the function as app runs
siteController.scheduleReminders(client);

//json
app.use(express.json());

//bodyparser
app.use(bodyParser.json());

//cors
app.use(cors());

//connect database
connectDB(DATABASE_URL);

//load routes
app.use("/", web);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
