import express from "express";
import bodyParser from "body-parser";
import webpush from "web-push";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(express.json());

const vapidKeys = {
  publiKey:
    "BP-3Q3m4nCvyngDLVfVLoVDoNogi07o_sHefsPMwb0ZfHlG9p7jZIGwLre5ZIz-4r9nKfK9PDUxlcpC5Qfl-D_w",
  privateKey: "QHi3BxGRf1CvMWwLnx_ER7UMFAIhQmx6xq_-DTb8IvA",
};

webpush.setVapidDetails(
  "mailto:cs.bappirahman@gmail.com",
  vapidKeys.publiKey,
  vapidKeys.privateKey
);

app.get("/", (_, res) => {
  res.send("Hello world");
});

const subDatabase = [];

app.post("/save-subscription", (req, res, next) => {
  subDatabase.push(req.body);
  console.log("subDatabase", subDatabase);
  res.json({ status: "Sucess", message: "Subscription saved!" });
});

app.get("/send-notification", (req, res) => {
  webpush.sendNotification(
    subDatabase[0],
    "You got a new notification from the server"
  );
  res.json({ status: "Success", message: "Message sent to push service" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
