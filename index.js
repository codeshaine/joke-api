import express from "express";
import jokes from "./data/apiData.js";
const app = express();
const port = 3000;
const masterKey = "codeshaine@123";

app.use(express.urlencoded({ extended: true }));

app.use("/jokes/all", (req, res, next) => {
  if (req.query.key == masterKey) {
    next();
  } else {
    res
      .status(404)
      .json({ status: "failed", message: "You are not Authorized" });
  }
});

//1. GET a random joke
app.get("/random", (req, res) => {
  try {
    if (jokes.length === 0) throw new Error("The database is empty");
    const randomNumber = Math.floor(Math.random() * jokes.length);
    const data = jokes[randomNumber];
    res.json({ status: "success", message: "random joke", data: data });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: `Error occured: ${err}`,
    });
  }
});

//2. GET a specific joke
app.get("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = jokes.find((item) => item.id === id);
  if (!data)
    res.status(404).json({ status: "failed", message: `id: ${id} not found` });
  else
    res.json({
      status: "success",
      message: `joke: ${id} is found`,
      data: data,
    });
});

//3. GET a jokes by filtering on the joke type
app.get("/filter", (req, res) => {
  const type = req.query.type;
  const data = jokes.filter((item) => item.jokeType === type);
  if (data.length === 0)
    res
      .status(404)
      .json({ status: "failed", message: `type: ${type} is not found` });
  else res.json({ status: "success", message: "filtered data", data: data });
});
//4. POST a new joke
app.post("/jokes", (req, res) => {
  const expectedProperties = ["text", "type"];
  const missingproperties = expectedProperties.filter(
    (props) => !(props in req.body)
  );
  if (missingproperties.length === 0) {
    const data = {
      id: jokes.length + 1,
      jokeText: req.body.text,
      jokeType: req.body.type,
    };
    jokes.push(data);
    res.json({
      status: "success",
      message: "inserted successfully",
      data: data,
    });
  } else {
    res.status(404).json({
      status: "failed",
      message: `please check paramter name missing properies : ${missingproperties}`,
    });
  }
});

//5. PUT a joke
app.put("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const expectedProperties = ["text", "type"];
  const missingproperties = expectedProperties.filter(
    (props) => !(props in req.body)
  );
  try {
    const index = jokes.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("index not found");
    if (missingproperties.length !== 0)
      throw new Error("check the properties entered");
    const replaceItem = {
      id: id,
      jokeText: req.body.text,
      jokeType: req.body.type,
    };

    jokes[index] = replaceItem;
    res.json({
      status: "success",
      message: "successfully updated",
      data: replaceItem,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: `Error occured:${err}`,
    });
  }
});

//6. PATCH a joke
app.patch("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const existingItem = jokes.find((item) => item.id === id);
    const replaceItem = {
      id: id,
      jokeText: req.body.text || existingItem.jokeText,
      jokeType: req.body.type || existingItem.jokeType,
    };
    const index = jokes.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("index not found");
    jokes[index] = replaceItem;
    res.json({
      status: "success",
      message: "successfully updated",
      data: replaceItem,
    });
  } catch (err) {
    res.status(403).json({
      status: "failed",
      message: `Error occured: ${err}`,
    });
  }
});
// 7. DELETE All jokes
app.delete("/jokes/all", (req, res) => {
  try {
    jokes.splice(0, jokes.length);
    res.json({
      status: "success",
      message: `successfully deleted all details`,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: `error occured:${err}`,
    });
  }
});

//8. DELETE Specific joke
app.delete("/jokes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const index = jokes.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("index not found");
    jokes.splice(index, 1);
    res.json({
      status: "success",
      message: `successfully deleted id: ${id}`,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: `Error occured: ${err}`,
    });
  }
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
