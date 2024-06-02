import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const tasks = {
  1: [], // Today's tasks
  2: [], // This week's tasks
  3: [], // This month's tasks
};

let currentTaskType = 1;

app.post("/day", (req, res) => {
  currentTaskType = 1;
  res.redirect("/");
});

app.post("/week", (req, res) => {
  currentTaskType = 2;
  res.redirect("/");
});

app.post("/month", (req, res) => {
  currentTaskType = 3;
  res.redirect("/");
});

app.get("/", (req, res) => {
  const titles = ["Today's Tasks", "This week's Tasks", "This month's Tasks"];
  res.render("index.ejs", {
    listTitle: titles[currentTaskType - 1],
    listItems: tasks[currentTaskType],
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  tasks[currentTaskType].push({ id: Date.now(), title: item });
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const item = req.body.updatedItemTitle;
  const itemId = parseInt(req.body.updatedItemId);
  const taskIndex = tasks[currentTaskType].findIndex(task => task.id === itemId);

  if (taskIndex !== -1) {
    tasks[currentTaskType][taskIndex].title = item;
  }

  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const itemId = parseInt(req.body.deleteItemId);
  tasks[currentTaskType] = tasks[currentTaskType].filter(task => task.id !== itemId);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
