const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

const dataDir = path.join(__dirname, "data");
const dataFile = path.join(dataDir, "users.json");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, "[]");
}

function getUsers() {
  return JSON.parse(fs.readFileSync(dataFile, "utf8"));
}

function saveUsers(users) {
  fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
}

app.post("/api/users", (req, res) => {
  const { username, confirmUsername } = req.body;

  if (!username || !confirmUsername) {
    return res.status(400).json({
      success: false,
      message: "Username aur Confirm Username required hai."
    });
  }

  if (username !== confirmUsername) {
    return res.status(400).json({
      success: false,
      message: "Username match nahi kar raha."
    });
  }

  const users = getUsers();

  users.push({
    username,
    createdAt: new Date().toISOString()
  });

  saveUsers(users);

  res.json({
    success: true,
    message: "Username successfully save ho gaya."
  });
});

app.get("/api/users", (req, res) => {
  res.json(getUsers());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
