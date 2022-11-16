const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
// middleware to fix req.body undefined
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("Server is running");
});

const users = [
  {
    id: 1,
    name: "Leanne Graham",
    email: "Sincere@april.biz",

  },
  {
    id: 2,
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
  },
];

//mongodb user credential
//user: dbuser1
//password: I9P7nQRdhzOimVwp

const uri = "mongodb+srv://dbuser1:I9P7nQRdhzOimVwp@cluster0.vpme6pb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try {
    const userCollection = client.db("simple-node").collection("users");
    app.post("/users",async (req,res) => {
      const user = req.body;
      const result  = await userCollection.insertOne(user);
      console.log(result)
      user.id = result.insertedId;
      res.send(user)
    })
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/users", (req, res) => {
  res.send(users);
});



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
