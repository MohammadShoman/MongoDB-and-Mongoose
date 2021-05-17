const express = require("express");
const todoModel = require("./schema");
const db = require("./db");

const app = express();
app.use(express.json());
//-----------------------------------------------------//
//Q3
app.get("/todos", (req, res) => {
  todoModel
    .find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});
//-----------------------------------------------------//
//Q4
app.get("/completed/todos", (req, res) => {
  todoModel
    .find({ isCompleted: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

//-----------------------------------------------------//
//Q1
app.post("/create/todo", (req, res) => {
  const { task, description, deadline, isCompleted, priority } = req.body;

  const todoList = new todoModel({
    task,
    description,
    deadline,
    isCompleted,
    priority,
  });

  todoList
    .save()
    .then((result1) => {
      res.json(result1);
    })
    .catch((err) => {
      res.json(err);
    });
});

//-----------------------------------------------------//

app.put("/update/todo", (req, res) => {
  const { task, description, deadline, isCompleted, priority } = req.body;

  todoModel
    .updateOne({ task }, { description, deadline, isCompleted, priority })
    .then((result) => {
      res.json("updated");
    })
    .catch((err) => {
      res.json(err);
    });
});

//-----------------------------------------------------//
app.delete("/delete/todo", (req, res) => {});
//-----------------------------------------------------//
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
