import express from "express";
import jokes from "./data/apiData.js";
const app = express();
const port = 3000;
const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";

app.use(express.urlencoded({ extended: true }));

//1. GET a random joke
app.get("/random", (req, res) => {
  const randomNumber = Math.floor(Math.random() * jokes.length);
  const data = jokes[randomNumber];
  res.json({ status: "success", message: "random joke", data: data });
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
  if (missingproperties.length === 0) {
    const replaceItem = {
      id: id,
      jokeText: req.body.text,
      jokeType: req.body.type,
    };
    const index = jokes.findIndex((item) => item.id === id);
    jokes[index] = replaceItem;
    res.json({
      status: "success",
      message: "successfully updated",
      data: replaceItem,
    });
  } else {
    res.status(404).json({
      status: "failed",
      message: `Invalid id ${id}/missing properties ${missingproperties}`,
    });
  }
});

//6. PATCH a joke
app.patch("/jokes/:id", (req, res) => {});
//7. DELETE Specific joke

//8. DELETE All jokes
// app.get("jokes/all", (req, res) => {
//   if (jokes.length == 0) res.send(404).json("there is no data found");
//   else res.json(jokes);
// });

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
