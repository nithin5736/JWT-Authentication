const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.post("/login", (req, res) => {
  const user = { name: "J" };
  jwt.sign(user, "Srikar", { expiresIn: "20s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

function verifyToken(req, res, next) {
  const Bearer = req.headers["authorization"];
  if (typeof Bearer !== "undefined") {
    const token = Bearer.split(" ")[1];
    req.token = token;
    next();
  } else {
    res.json({ msge: "Invalid User" });
  }
}

app.get("/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "Srikar", (err, data) => {
    if (err) res.json({ Error: "Invalid User" });
    else res.json({ data });
  });
});

app.listen(3000);
