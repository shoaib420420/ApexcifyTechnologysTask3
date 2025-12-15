// const dotenv = require('dotenv');
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const connectDB = require('./config/db');

// dotenv.config();

// const authRoutes = require('./routes/auth');
// const usersRoutes = require('./routes/users');

// const app = express();

// // Connect DB once only
// connectDB();
// const corsOptions = {
//   origin: "http://localhost:3000",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// };
// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));

// // app.use(cors());

// app.use(express.json());
// app.use(bodyParser.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', usersRoutes);
// app.use('/api/exams', require('./routes/exams'));
// app.use('/api/fees', require('./routes/fees'));
// app.use('/api/materials', require('./routes/materials'));
// app.use('/api/timetables', require('./routes/timetables'));
// app.use('/api/notifications', require('./routes/notifications'));

// app.get('/', (req, res) => {
//   res.send('School API running');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on ${PORT}`));







require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/students", require("./routes/students"));
app.use("/api/teachers", require("./routes/teachers"));
app.use("/api/classes", require("./routes/classes"));
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/fees", require("./routes/fees"));
app.use("/api/timetables", require("./routes/timetables"));
app.use("/api/materials", require("./routes/materials"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/users", require("./routes/users"));
app.use("/api/leaves", require("./routes/leaves"));
app.use("/api/exams", require("./routes/exams"));
app.use("/api/subjects", require("./routes/subjects"));
app.use("/api/dashboard", require("./routes/dashboard"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
