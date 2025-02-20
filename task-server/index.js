require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y41ia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    const db = client.db("test");
    //   ----------Collections--------
    const userCollection = db.collection("task-users");
    const taskCollection = db.collection("tasks");

    // save user
    app.post("/user", async (req, res) => {
      const userData = req.body;
      // insert email if user doesn't exist
      const isExist = await userCollection.findOne({ email: userData?.email });
      if (isExist) {
        return res.send({ message: "User Already exists in db" });
      }
      const result = await userCollection.insertOne(userData);
      res.send(result);
    });

    // save task

    app.post("/tasks", async (req, res) => {
      const taskData = req.body;
      const result = await taskCollection.insertOne(taskData);
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Task is Loading");
});

app.listen(port, () => {
  console.log(`Task is getting Managed on PORT ${port}`);
});
