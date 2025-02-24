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
      try {
        const userData = req.body;
        // insert email if user doesn't exist
        const isExist = await userCollection.findOne({
          email: userData?.email,
        });
        if (isExist) {
          return res.status(409).send({ message: "User Already exists in db" });
        }
        const result = await userCollection.insertOne(userData);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error });
      }
    });

    // save task
    app.post("/tasks", async (req, res) => {
      try {
        const task = req.body;
        const taskData = {
          ...task,
          createdAt: new Date().toISOString(),
          category: "todo",
        };
        const result = await taskCollection.insertOne(taskData);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error });
      }
    });

    // get tasks
    app.get("/tasks", async (req, res) => {
      try {
        const result = await taskCollection.find().toArray();
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error });
      }
    });

    // get single task
    app.get("/tasks/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const query = { _id: new ObjectId(id) };
        const result = await taskCollection.findOne(query);
        if (!result) {
          return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error });
      }
    });

    // update task category
    app.patch("/update-category/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { category } = req.body;
        const query = { _id: new ObjectId(id) };
        const updatedCategory = {
          $set: { category },
        };
        const result = await taskCollection.updateOne(query, updatedCategory);
        if (result.matchedCount === 0) {
          return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error });
      }
    });

    // update task by id
    app.put("/tasks/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const taskData = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await taskCollection.updateOne(query, {
          $set: taskData,
        });
        if (result.matchedCount === 0) {
          return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error });
      }
    });

    // delete task
    app.delete("/tasks/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const query = { _id: new ObjectId(id) };
        const result = await taskCollection.deleteOne(query);
        if (result.deletedCount === 0) {
          return res.status(404).send({ message: "Task not found" });
        }
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error });
      }
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
